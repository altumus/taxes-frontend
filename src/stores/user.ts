import { defineStore } from "pinia";
import md5 from "md5";
import * as Api from "@/js/services/user.service";
import { CreateUserType, UserType } from "@/types/userTypes";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as UserType,
    allUsers: [] as UserType[],
  }),
  actions: {
    async login(login: string, password: string, encrypted: boolean) {
      const mdCoded = encrypted ? password : md5(password);
      const user = await Api.login(login, mdCoded);
      localStorage.setItem("login", user.login);
      localStorage.setItem("password", user.password);
      console.log("user", user);
      this.user = user;
      return user;
    },
    logout() {
      localStorage.setItem("login", "");
      localStorage.setItem("password", "");
      this.user = {} as UserType;
    },
    async addUser(dto: CreateUserType) {
      const newUser = await Api.addUser(dto);
      this.allUsers.push(newUser);
    },
    checkUser(login: string) {
      return Api.checkUser(login);
    },
    async getAllUsers(inspectionId: number) {
      const users = await Api.getAllUsers(inspectionId);
      console.log("all users", users);
      this.allUsers = users;
    },
    async deleteUser(userId: number) {
      await Api.deleteUser(userId);
      const userIndex = this.allUsers.findIndex((user) => user.id === userId);
      if (userIndex === -1) return;
      this.allUsers.splice(userIndex, 1);
    },
  },
});
