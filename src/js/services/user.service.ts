import axios from "@/js/plugins/axios";
import { CreateUserType } from "@/types/userTypes";

export async function login(login: string, password: string) {
  try {
    const result = await axios.get(`/users/user/${login}/${password}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function addUser(dto: CreateUserType) {
  try {
    const result = await axios.post("/users/add-user", dto);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function checkUser(login: string) {
  try {
    const result = await axios.get(`/users/check-user/${login}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}
