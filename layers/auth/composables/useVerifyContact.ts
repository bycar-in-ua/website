import { useMutation } from "@tanstack/vue-query";
import type { VerifyContactInput } from "@bycar-in-ua/auth-sdk";

export function useVerifyContact() {
  const fetch = useRequestFetch();

  return useMutation({
    mutationKey: ["auth", "verify-contact"],
    mutationFn: async (payload: VerifyContactInput) => fetch("/api/auth/verify-contact", {
      method: "POST",
      body: payload,
    }),
  });
}
