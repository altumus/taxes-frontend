import { defineStore } from "pinia";
import * as Api from "@/js/services/client.service";
import {
  Client,
  CreateClientRequest,
  CreateOrganizationRequest,
  CreatePaymentRequest,
  EditClientRequest,
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
          message: "Контрагент уже закреплен за другой инспекцией",
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
        this.clients[clientIndex].isArchived = true;
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
    async editClient(body: EditClientRequest) {
      const client = await Api.editClient(body);
      this.clients[0].clientType = client.clientType;
      this.clients[0].email = client.email;
      this.clients[0].inn = client.inn;
      this.clients[0].phone = client.phone;
      this.clients[0].name = client.name;
      this.clients[0].isArchived = client.isArchived;
    },
  },
});
