import axios from "@/js/plugins/axios";
import {
  CreateClientRequest,
  CreateOrganizationRequest,
  CreatePaymentRequest,
} from "@/types/clientTypes";

export async function getClientsByInspectionId(inspectionId: number) {
  try {
    const result = await axios.get(`/clients/all-clients/${inspectionId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function createClient(body: CreateClientRequest) {
  try {
    const result = await axios.post(`/clients/add-client`, body);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function createOrganization(body: CreateOrganizationRequest) {
  try {
    const result = await axios.post(`/clients/add-organization`, body);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function createPayment(body: CreatePaymentRequest) {
  try {
    const result = await axios.post(`/clients/add-payment`, body);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getClientInfo(inspectionId: number, clientId: number) {
  try {
    const result = await axios.get(
      `/clients/client-info/${inspectionId}/${clientId}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}
