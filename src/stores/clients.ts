import { defineStore } from "pinia";
import * as Api from "@/js/services/client.service";
import {
  Client,
  CreateClientRequest,
  CreateOrganizationRequest,
  CreatePaymentRequest,
} from "@/types/clientTypes";

import "element-plus/es/components/notification/style/css";
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
      return client;
    },
    async createOrganization(body: CreateOrganizationRequest) {
      try {
        const organization = await Api.createOrganization(body);
        return organization;
      } catch (error) {
        ElNotification({
          message: "Клиент уже закреплен за другой инспекцией",
          duration: 1500,
          type: "error",
        });
      }
    },
    async getClientInfo(inspectionId: number, clientId: number) {
      const client = await Api.getClientInfo(inspectionId, clientId);
      this.clients.push(client);
      return client;
    },
    async createPayment(body: CreatePaymentRequest) {
      return Api.createPayment(body);
    },
  },
});
