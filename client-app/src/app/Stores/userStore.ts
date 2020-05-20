import { observable, computed, action } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import Agent from "../API/Agent";

export default class UserStore {

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await Agent.User.login(values);
      this.user = user // assign the user we get back from await Agent.User.login(values); to the observable user. 
    } catch (error) {
      console.log(error);
    }
  };
}
