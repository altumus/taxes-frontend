import axios from "@/js/plugins/axios";
import {
  CreateClientRequest,
  CreateOrganizationRequest,
  CreatePaymentRequest,
  EditClientRequest,
  EditOrganizationDto,
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

export async function returnClient(clientId: number) {
  try {
    const result = await axios.patch(`/clients/return-client/${clientId}`);
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

export async function deleteClient(clientId: number) {
  try {
    const result = await axios.delete(`/clients/delete-client/${clientId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function createSuccessPayment(
  organizationId: number,
  payment: string
) {
  try {
    const result = await axios.post(`/clients/add-success-payment`, {
      organizationId,
      payment,
    });
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
    console.log("result", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function editClient(body: EditClientRequest) {
  try {
    const result = await axios.patch(`/clients/edit-client`, body);
    console.log("edit client", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getClientWithOrganization(
  inspectionId: number,
  clientId: number,
  organizationId: number
) {
  try {
    const result = await axios.get(
      `/clients/client-with-org/${inspectionId}/${clientId}/${organizationId}`
    );
    console.log("get client info", result.data);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function editOrganization(body: EditOrganizationDto) {
  try {
    const result = await axios.patch(`/clients/edit-organization`, body);
    return result.data;
  } catch (error) {
    throw error;
  }
}
