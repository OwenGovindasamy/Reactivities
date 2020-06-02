import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import Agent from "../API/Agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await Agent.User.login(values);
      runInAction(() => {
        //runInAction is used after await... because after an async action occurs this is considered a new se
        this.user = user; // assign the user we get back from await Agent.User.login(values); to the observable user.
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };
  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/")
  };

  @action getUser = async () => {
    try{
      const user = await Agent.User.current();
      runInAction(() => {
        this.user = user;
      })
    } catch (error) {
      console.log(error);
    }
  }

  @action register = async (values: IUserFormValues) =>
  {
    try{
      const user = await Agent.User.register(values);
      runInAction(() => {
        this.rootStore.commonStore.setToken(user.token);
        this.rootStore.modalStore.closeModal();
        history.push('/activities')
      })
    }
    catch(error)
    {
      throw(error)
    }
  }
}
