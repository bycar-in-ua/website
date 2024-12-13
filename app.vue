<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <Header />
    <NuxtPage />
    <Footer />
    <CookieBanner v-if="!cookieAccepted" @accept-cookie="acceptCookieHandler" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";
import CookieBanner from "@/components/CookieBanner.vue";

const nuxtApp = useNuxtApp();

const cookieAccepted = ref(true);

const acceptCookieHandler = () => {
  cookieAccepted.value = true;
  localStorage.setItem("cookieAccepted", "true");
};

if (import.meta.client) {
  nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0);
  });

  cookieAccepted.value = localStorage.getItem("cookieAccepted") === "true";
}
</script>
