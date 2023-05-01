import { defineStore } from "pinia";
import md5 from "md5";
import * as Api from "@/js/services/user.service";
import { CreateUserType, EditUserDto, UserType } from "@/types/userTypes";

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
    async editUser(body: EditUserDto) {
      const updatedUser = await Api.editUser(body);
      console.log("update", updatedUser);
      if (!body.type) {
        this.user.login = updatedUser.login;
        this.user.password = updatedUser.password;
        this.user.name = updatedUser.name;
        localStorage.setItem("login", updatedUser.login);
        localStorage.setItem("password", updatedUser.password);
        return;
      } else {
        this.allUsers[0].login = updatedUser.login;
        this.allUsers[0].password = updatedUser.password;
        this.allUsers[0].name = updatedUser.name;
        this.allUsers[0].type = updatedUser.type;
      }
    },
    async getUserById(userId: number) {
      const user = await Api.getUserById(userId);
      console.log("getted user", user);
      this.allUsers.push(user);
    },
  },
});
