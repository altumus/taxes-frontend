import { defineStore } from "pinia";
import * as Api from "@/js/services/user.service";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async getUser(id: number, password: string) {
      const user = await Api.getUser(id, password);
      console.log("user", user);
    },
  },
});
