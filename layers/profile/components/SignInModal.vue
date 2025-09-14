<script setup lang="ts">
import BluredEllipseBlueAndYellow from "~/components/UI/BluredEllipseBlueAndYellow.vue";
import Logo from "~/components/UI/Logo.vue";
import type { SignInStage } from "#layers/profile/composables/useSignInStage";
import { useSignInStageProvider } from "#layers/profile/composables/useSignInStage";
import { useSignInModalStore } from "../stores/sign-in-modal";
import LoginForm from "./LoginForm.vue";
import SignUpForm from "./SignUpForm.vue";
import ConfirmPhoneNumber from "./ConfirmPhoneNumber.vue";
import ForgotPasswordForm from "./ForgotPasswordForm.vue";
import ResetPasswordForm from "./ResetPasswordForm.vue";

const { stage, setStage } = useSignInStageProvider();

const stageComponents: Record<SignInStage, Component> = {
  "login": LoginForm,
  "signup": SignUpForm,
  "confirm-phone": ConfirmPhoneNumber,
  "forgot-password": ForgotPasswordForm,
  "reset-password": ResetPasswordForm,
};

const signInModal = useSignInModalStore();

const { gtag } = useGtag();

const afterEnterEvent = () => {
  gtag("event", "sign_in_modal_open", {
    event_category: "engagement",
    event_label: "sign_in_modal",
  });
};
</script>

<template>
  <UModal
    v-model:open="signInModal.open"
    :loading="true"
    :ui="{ content: 'overflow-y-auto divide-none' }"
    @after:enter="afterEnterEvent"
    @after:leave="setStage('login')"
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
          @click="signInModal.open = false"
        />

        <Logo class="h-10" />
      </div>

      <div class="p-6">
        <component :is="stageComponents[stage]" />
      </div>
    </template>
  </UModal>
</template>
