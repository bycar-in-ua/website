<script setup lang="ts">
import Logo from "~/components/UI/Logo.vue";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import type { AuthStage } from "#layers/auth/stores/auth-slideover";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import UnifiedSignInForm from "./UnifiedSignInForm.vue";
import ConfirmOtpForm from "./ConfirmOtpForm.vue";
import EnterPasswordForm from "./EnterPasswordForm.vue";
import ForgotPasswordForm from "./ForgotPasswordForm.vue";
import ResetPasswordForm from "./ResetPasswordForm.vue";

const store = useAuthSlideoverStore();

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
  <DrawerSlideover
    v-model:open="store.isOpen"
    hide-borders
    @after:enter="onAfterEnter"
    @after:leave="store.reset"
  >
    <template #body>
      <div class="flex flex-col items-center mt-1.5 sm:mt-3 md:mt-14">
        <Logo class="h-8 sm:h-10 mb-6" />

        <div class="w-full">
          <Transition name="fade" mode="out-in">
            <component :is="stageComponents[store.stage]" :key="store.stage" />
          </Transition>
        </div>
      </div>
    </template>
  </DrawerSlideover>
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
