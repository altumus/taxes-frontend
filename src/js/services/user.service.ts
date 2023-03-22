import axios from "@/js/plugins/axios";

export async function getUser(id: number, password: string) {
  try {
    const result = await axios.get("/users/user", {
      data: {
        id,
        password,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
