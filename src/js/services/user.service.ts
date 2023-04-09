import axios from "@/js/plugins/axios";

export async function login(login: string, password: string) {
  try {
    const result = await axios.get(`/users/user/${login}/${password}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}
