import axios from "@/js/plugins/axios";
import { CreateUserType, EditUserDto } from "@/types/userTypes";

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

export async function getAllUsers(inspectionId: number) {
  try {
    const result = await axios.get(`/users/all-users/${inspectionId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId: number) {
  try {
    const result = await axios.delete(`/users/delete-user/${userId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function editUser(body: EditUserDto) {
  try {
    const result = await axios.patch(`/users/edit-user`, body);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(userId: number) {
  try {
    const result = await axios.get(`/users/get-user-by-id/${userId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}
