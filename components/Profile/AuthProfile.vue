<script setup lang="ts">
import ModalCloseButton from "./ModalCloseButton.vue";
import Login from "./Login.vue";
import Signup from "./Signup.vue";
import ProfileButton from "./ProfileButton.vue";

const open = defineModel<boolean>("open");
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
  <ProfileButton v-if="authStore.user" />

  <UModal v-else v-model:open="open" :ui="{ content: 'overflow-y-scroll' }">
    <UButton variant="outline" size="xl" class="bg-white/90 p-2">
      <UIcon name="i-heroicons-arrow-right-end-on-rectangle" class="w-6 h-6" />
      <span class="hidden md:block"> Профіль </span>
    </UButton>

    <template #content>
      <ModalCloseButton v-model:open="open" />

      <Signup
        v-if="isSignupModalOpen"
        v-model:open="open"
        @open-login-modal="openModal('login')"
      />
      <Login
        v-else
        v-model:open="open"
        @open-signup-modal="openModal('signup')"
      />
    </template>
  </UModal>
</template>
