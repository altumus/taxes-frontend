import { defineStore } from "pinia";
import * as Api from "@/js/services/client.service";
import { CreateClientRequest } from "@/types/clientTypes";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [] as Array<any>,
  }),
  actions: {
    async getClientsByInspectionId(inspectionId: number) {
      const clients = await Api.getClientsByInspectionId(inspectionId);
      this.clients = clients;
      console.log("clients", clients);
    },
    async createClient(body: CreateClientRequest) {
      const client = await Api.createClient(body);
      console.log("client", client);
      this.clients.push(client);
    },
  },
});
