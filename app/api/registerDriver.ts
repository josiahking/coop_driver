import { axiosInstance } from "@/constants/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useRegisterDriver() {
  return useMutation({
    mutationFn: async (data: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      password: string;
      password_confirmation: string;
    }) => {
      const res = await axiosInstance.post("/api/driver/register", data);
      return res.data;
    },
  });
}
