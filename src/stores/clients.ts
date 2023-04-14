import { defineStore } from "pinia";
import * as Api from "@/js/services/client.service";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: null,
  }),
  actions: {
    async getClientsByInspectionId(inspectionId: number) {
      const clients = await Api.getClientsByInspectionId(inspectionId);
      console.log("clients", clients);
    },
  },
});
