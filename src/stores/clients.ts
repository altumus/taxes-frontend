import { defineStore } from "pinia";
import * as Api from "@/js/services/client.service";
import {
  CreateClientRequest,
  CreateOrganizationRequest,
} from "@/types/clientTypes";

import { ElNotification } from "element-plus";

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
      this.clients.push(client);
      return client;
    },
    async createOrganization(body: CreateOrganizationRequest) {
      try {
        const client = await Api.createOrganization(body);
        this.clients.push(client);
      } catch (error) {
        ElNotification({
          message: "Клиент уже закреплен за другой инспекцией",
          type: "warning",
          duration: 4500,
        });
      }
    },
  },
});
