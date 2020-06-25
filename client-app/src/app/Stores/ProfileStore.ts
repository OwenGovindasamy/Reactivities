import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile, IPhoto } from "../models/profile";
import Agent from "../API/Agent";
import { compareAsc } from "date-fns/fp";
import { th } from "date-fns/locale";
import { toast } from "react-toastify";

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      //console.log(this.rootStore.userStore.user.username + '' + '' +  this.profile.username)
      return this.rootStore.userStore.user.username === this.profile.userName;
    } else {
      return false;
    }
  }

  @action loadProfile = async (username: string) => {
    try {
      const profile = await Agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
        //console.log(profile);
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await Agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      toast.error("Problem uploading photo");
      console.log(error);
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await Agent.Profiles.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.photos.find((a) => a.isMain)!.isMain = false;
        this.profile!.photos.find((a) => a.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
        this.loading = false;
      });
    } catch (error) {
      toast.error("Problem setting photo as main");
      runInAction(() => {
        console.log(error);
        this.loading = false;
      });
    }
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await Agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter(
          (a) => a.id !== photo.id
        );
        this.loading = false;
      });
    } catch (error) {
      toast.error("Unable to delete photo");
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
