import { axiosInstance } from "@/constants/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useRequestOtp() {
  return useMutation({
    mutationFn: async (data: {
      requested_by: string;
      request_using: string;
      request_for: string;
    }) => {
      const res = await axiosInstance.post("/api/otp/request", data);
      console.log(res.data, ":::");
      return res.data;
    },
  });
}
