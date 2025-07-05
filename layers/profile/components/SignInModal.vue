<script setup lang="ts">
import BluredEllipseBlueAndYellow from "@/components/UI/BluredEllipseBlueAndYellow.vue";
import Logo from "@/components/UI/Logo.vue";
import LoginForm from "./LoginForm.vue";
import SignUpForm from "./SignUpForm.vue";

type Stage =
  | "login"
  | "signup"
  | "confirm-email"
  | "confirm-phone"
  | "reset-password";

const stage = ref<Stage>("login");

const stageComponents: Record<Stage, Component> = {
  "login": LoginForm,
  "signup": SignUpForm,
  "confirm-email": LoginForm,
  "confirm-phone": LoginForm,
  "reset-password": LoginForm,
};

const authStore = useAuthStore();
</script>

<template>
  <UModal
    v-model:open="authStore.loginModal.open"
    :loading="true"
    :ui="{ content: 'overflow-y-auto divide-none' }"
  >
    <template #content>
      <div class="relative flex justify-center pt-6">
        <BluredEllipseBlueAndYellow
          class="absolute top-0 left-1/2 -translate-x-1/2 -z-10"
        />

        <UButton
          icon="i-heroicons-x-mark"
          class="absolute top-2 right-2"
          variant="ghost"
          @click="authStore.loginModal.open = false"
        />

        <Logo />
      </div>

      <div class="p-6">
        <component :is="stageComponents[stage]" />
      </div>
    </template>
  </UModal>
</template>
