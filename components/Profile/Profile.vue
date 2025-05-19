<script setup lang="ts">
import ModalCloseButton from "./ModalCloseButton.vue";
import Login from "./Login.vue";
import Signup from "./Signup.vue";

const open = defineModel<boolean>("open");
const isLoginModalOpen = ref(false);
const isSignupModalOpen = ref(false);

function openModal(modal: "login" | "signup") {
  if (modal === "login") {
    isLoginModalOpen.value = true;
    isSignupModalOpen.value = false;
  } else {
    isLoginModalOpen.value = false;
    isSignupModalOpen.value = true;
  }
}
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'overflow-y-scroll' }">
    <UButton>Увійти</UButton>

    <template #content>
      <ModalCloseButton v-model:open="open" />

      <Login
        v-if="isLoginModalOpen"
        v-model:open="isLoginModalOpen"
        @open-signup-modal="openModal('signup')"
      />
      <Signup
        v-else
        v-model:open="isSignupModalOpen"
        @open-login-modal="openModal('login')"
      />
    </template>
  </UModal>
</template>
