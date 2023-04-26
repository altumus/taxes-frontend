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
    async deleteClient(clientId: number) {
      try {
        await Api.deleteClient(clientId);
        const clientIndex = this.clients.findIndex(
          (client) => client.id === clientId
        );
        if (clientIndex === -1) return;
        this.clients.splice(clientIndex, 1);
      } catch (error) {
        throw error;
      }
    },
    async returnClient(clientId: number) {
      await Api.returnClient(clientId);
      const clientIndex = this.clients.findIndex(
        (client) => client.id === clientId
      );
      if (clientIndex === -1) return;
      this.clients[clientIndex].isArchived = false;
    },
    async createSuccessPayment(organizationId: number, payment: string) {
      try {
        const result = await Api.createSuccessPayment(organizationId, payment);
        return result;
      } catch (error) {
        throw error;
      }
    },
    async getClientInfo(inspectionId: number, clientId: number) {
      const client = await Api.getClientInfo(inspectionId, clientId);
      this.clients.unshift(client);
      return client;
    },
    async createPayment(body: CreatePaymentRequest) {
      return Api.createPayment(body);
    },
  },
});
