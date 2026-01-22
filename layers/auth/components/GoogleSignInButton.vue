<script setup lang="ts">
import Google from "~/components/UI/Icons/Google.vue";
import { useAuthSlideover } from "../composables/useAuthSlideover";

const authSlideover = useAuthSlideover();
const authService = useAuthService();
const { resolve, currentRoute } = useRouter();
const { gtag } = useGtag();

const { status, execute: googleSignIn } = useAsyncData(
  "google-sign-in",
  async () => {
    const profileRoute = resolve({ name: "profile-personal" });
    const redirectUrl = new URL(
      String(authSlideover.redirect.value || profileRoute.fullPath),
      window?.location.origin ?? "",
    );

    // Create error redirect URL with toast message
    const errorUrl = new URL(currentRoute.value.path, window?.location.origin ?? "");
    errorUrl.searchParams.set("toast_color", "error");
    errorUrl.searchParams.set("toast_message", "Щось пішло не так. Скоріше за все аккаунт вже існує.");

    const googleLogin = await authService.googleLogin({
      redirectTo: redirectUrl.href,
      redirectOnError: errorUrl.href,
    });

    navigateTo(googleLogin.url, { external: true });

    gtag("event", "google_sign_in", {
      event_category: "engagement",
      event_label: "google_sign_in",
    });

    return googleLogin;
  },
  { immediate: false },
);

const loading = computed(() => status.value === "pending");
</script>

<template>
  <UButton
    variant="outline"
    block
    :loading="loading"
    @click="googleSignIn()"
  >
    <Google />
    <slot>Увійти через Google</slot>
  </UButton>
</template>
