import { useMutation } from "@tanstack/vue-query";

export function useUpdateContact() {
  const fetch = useRequestFetch();

  return useMutation({
    mutationKey: ["auth", "update-contact"],
    mutationFn: async (contact: string) => fetch("/api/auth/update-contact", {
      method: "PATCH",
      body: { contact },
    }),

  });
}
