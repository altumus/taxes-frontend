import { defineStore } from "pinia";
import md5 from "md5";
import * as Api from "@/js/services/user.service";
import { UserType } from "@/types/userTypes";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as UserType,
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
  },
});
