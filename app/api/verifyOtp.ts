import { axiosInstance } from "@/constants/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtp() {
  return useMutation({
    mutationFn: async (data: { otp: string; passkey: string }) => {
      const res = await axiosInstance.post("/api/otp/verify", data);
      return res.data;
    },
  });
}
