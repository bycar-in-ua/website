import * as OrganizationJsonld from "@/jsonld/organization.json";

export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(OrganizationJsonld),
      },
    ],
  });
});
