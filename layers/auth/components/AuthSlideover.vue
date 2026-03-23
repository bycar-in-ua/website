<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import type { AuthStage } from "../composables/useSignIn";
import { useAuthSlideover } from "../composables/useAuthSlideover";
import UnifiedSignInForm from "./UnifiedSignInForm.vue";
import ConfirmOtpForm from "./ConfirmOtpForm.vue";
import EnterPasswordForm from "./EnterPasswordForm.vue";
import ForgotPasswordForm from "./ForgotPasswordForm.vue";
import ResetPasswordForm from "./ResetPasswordForm.vue";

const { open } = useAuthSlideover();
const { stage, reset } = useSignInProvider();

const stageComponents: Record<AuthStage, Component> = {
  "enter-credential": UnifiedSignInForm,
  "confirm-otp": ConfirmOtpForm,
  "enter-password": EnterPasswordForm,
  "forgot-password": ForgotPasswordForm,
  "reset-password": ResetPasswordForm,
};

const { gtag } = useGtag();

function onAfterEnter() {
  gtag("event", "auth_slideover_open", {
    event_category: "engagement",
    event_label: "auth_slideover",
  });
}
</script>

<template>
  <USlideover
    v-model:open="open"
    side="right"
    inset
    :ui="{ content: 'divide-none max-w-lg', body: '' }"
    @after:enter="onAfterEnter"
    @after:leave="reset"
  >
    <template #body>
      <div class="flex flex-col items-center sm:mt-6 md:mt-14">
        <Logo class="h-10 mb-6" />

        <div class="w-full">
          <Transition name="fade" mode="out-in">
            <component :is="stageComponents[stage]" :key="stage" />
          </Transition>
        </div>
      </div>
    </template>
  </USlideover>

  <slot />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
