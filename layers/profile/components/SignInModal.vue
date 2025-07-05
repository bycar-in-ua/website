<script setup lang="ts">
import ModalCloseButton from "./ModalCloseButton.vue";
import Login from "./LogIn.vue";
import Signup from "./SignUp.vue";

const isLoginModalOpen = ref(false);
const isSignupModalOpen = ref(false);

const authStore = useAuthStore();

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
  <UModal
    v-model:open="authStore.loginModal.open"
    :ui="{ content: 'overflow-y-scroll' }"
  >
    <template #content>
      <ModalCloseButton v-model:open="authStore.loginModal.open" />

      <Signup
        v-if="isSignupModalOpen"
        v-model:open="authStore.loginModal.open"
        @open-login-modal="openModal('login')"
      />
      <Login
        v-else
        v-model:open="authStore.loginModal.open"
        @open-signup-modal="openModal('signup')"
      />
    </template>
  </UModal>
</template>
