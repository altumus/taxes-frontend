import { defineStore } from "pinia";
import * as Api from "@/js/services/client.service";
import {
  Client,
  CreateClientRequest,
  CreateOrganizationRequest,
  CreatePaymentRequest,
} from "@/types/clientTypes";

import { ElNotification } from "element-plus";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [] as Client[],
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
        const organization = await Api.createOrganization(body);
        const ownerIndex = this.clients.findIndex(
          (client) => client.id === organization.clientId
        );
        this.clients[ownerIndex].organizations.push(organization);
      } catch (error) {
        ElNotification({
          message: "Клиент уже закреплен за другой инспекцией",
          duration: 1500,
          type: "error",
        });
      }
    },
    async createPayment(body: CreatePaymentRequest) {
      return Api.createPayment(body);
    },
  },
});
