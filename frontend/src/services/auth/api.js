import { instance } from "../instance";

export const loginApi = async (payload) => {
  const res = await instance.post("/auth/login", payload);
  return res.data;
};
export const registerApi = async (payload) => {
  const res = await instance.post("/auth/register", payload);
  return res.data;
};
