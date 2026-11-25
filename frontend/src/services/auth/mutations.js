import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "./api";

export const useRegisterMutations = () => {
  return useMutation({ mutationFn: registerApi });
};
export const useLoginMutations = () => {
  return useMutation({ mutationFn: loginApi });
};
