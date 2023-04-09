import { defineStore } from "pinia";
import md5 from "md5";
import * as Api from "@/js/services/user.service";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(login: string, password: string, encrypted: boolean) {
      const mdCoded = encrypted ? password : md5(password);
      const user = await Api.login(login, mdCoded);
      localStorage.setItem("login", user.login);
      localStorage.setItem("password", user.password);
      return user;
    },
  },
});
