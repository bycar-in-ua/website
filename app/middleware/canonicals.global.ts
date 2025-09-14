import { generateCanonicalUrl } from "~/utils/seo";

export default defineNuxtRouteMiddleware((to) => {
  useHead({
    link: [
      {
        rel: "canonical",
        href: generateCanonicalUrl(to.fullPath),
      },
    ],
  });
});
