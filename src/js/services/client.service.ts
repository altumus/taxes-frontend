import axios from "@/js/plugins/axios";

export async function getClientsByInspectionId(inspectionId: number) {
  try {
    const result = await axios.get(`/clients/all-clients/${inspectionId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}
