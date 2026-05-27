<script setup lang="ts">
import { provideSSRWidth } from "@vueuse/core";
import Header from "~/components/Header/index.vue";
import Footer from "~/components/Footer/index.vue";
import CookieBanner from "~/components/CookieBanner.vue";
import AuthSlideover from "#layers/auth/components/AuthSlideover.vue";
import QuizProvider from "#layers/quiz/components/QuizProvider.vue";
import { useProfileProvider } from "#layers/profile/composables/useProfile";

provideSSRWidth(500);

useHead({
  htmlAttrs: { lang: "ua" },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico",
    },
  ],
});

const nuxtApp = useNuxtApp();

const cookieAccepted = ref(true);

const acceptCookieHandler = () => {
  cookieAccepted.value = true;
  localStorage.setItem("cookieAccepted", "true");
};

const { profile } = useProfileProvider();

await profile.suspense();

if (import.meta.client) {
  nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0);
  });

  cookieAccepted.value = localStorage.getItem("cookieAccepted") === "true";

  const initialToast = useQueryToast();

  if (initialToast) {
    useToast().add(initialToast);
  }
}
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <AuthSlideover />
    <QuizProvider />
    <NuxtLayout>
      <NuxtLoadingIndicator color="var(--ui-primary)" />
      <Header />
      <NuxtPage />
      <Footer />
      <CookieBanner
        v-if="!cookieAccepted"
        @accept-cookie="acceptCookieHandler"
      />
    </NuxtLayout>
  </UApp>
</template>
