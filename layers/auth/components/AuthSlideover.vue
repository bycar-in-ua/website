<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import type { AuthStage } from "../composables/useAuthStage";
import { useAuthStageProvider } from "../composables/useAuthStage";
import { useAuthSlideover } from "../composables/useAuthSlideover";
import UnifiedAuthForm from "./UnifiedAuthForm.vue";
import ConfirmOtpForm from "./ConfirmOtpForm.vue";
import ForgotPasswordForm from "./ForgotPasswordForm.vue";
import ResetPasswordForm from "./ResetPasswordForm.vue";

const { stage, reset } = useAuthStageProvider();
const { open } = useAuthSlideover();

const stageComponents: Record<AuthStage, Component> = {
  "enter-credential": UnifiedAuthForm,
  "confirm-otp": ConfirmOtpForm,
  "enter-password": UnifiedAuthForm,
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

function onAfterLeave() {
  reset();
}
</script>

<template>
  <USlideover
    v-model:open="open"
    side="right"
    inset
    :ui="{ content: 'divide-none max-w-lg', body: '' }"
    @after:enter="onAfterEnter"
    @after:leave="onAfterLeave"
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
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
