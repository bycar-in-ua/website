<script setup lang="ts">
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import type { AuthStage } from "#layers/auth/stores/auth-slideover";
import { useAuthSlideoverStore } from "#layers/auth/stores/auth-slideover";
import UnifiedSignInForm from "./UnifiedSignInForm.vue";
import ConfirmOtpForm from "./ConfirmOtpForm.vue";
import EnterPasswordForm from "./EnterPasswordForm.vue";
import ResetPasswordForm from "./ResetPasswordForm.vue";
import CompleteIntroduction from "./CompleteIntroduction.vue";

const store = useAuthSlideoverStore();

const stageComponents: Record<AuthStage, Component> = {
  "enter-credential": UnifiedSignInForm,
  "confirm-otp": ConfirmOtpForm,
  "enter-password": EnterPasswordForm,
  "reset-password": ResetPasswordForm,
  "complete-introduction": CompleteIntroduction,
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
      <div class="mt-1.5 sm:mt-3 md:mt-14">
        <Transition name="fade" mode="out-in">
          <component :is="stageComponents[store.stage]" :key="store.stage" />
        </Transition>
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
