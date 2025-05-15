<script setup lang="ts">
import Logo from "../UI/Logo.vue";
import Navigation from "./Navigation.vue";
import LoginModal from "./LoginModal.vue";
import { useScrollListener } from "./useScrollListener";
import RegisterModal from "./RegisterModal.vue";

const scrolled = ref(false);
const isLoginModalOpen = ref(false);
const isRegisterModalOpen = ref(false);

if (import.meta.client) {
  useScrollListener(scrolled);
}

function openModal(modal: "login" | "register") {
  if (modal === "login") {
    isLoginModalOpen.value = true;
    isRegisterModalOpen.value = false;
  } else {
    isLoginModalOpen.value = false;
    isRegisterModalOpen.value = true;
  }
}
</script>

<template>
  <header
    class="z-40 fixed left-0 right-0 py-2 transition-all duration-300"
    :class="
      scrolled
        ? 'top-0 backdrop-blur-md bg-white/40 shadow-md'
        : 'top-2 md:top-8'
    "
  >
    <div class="container flex items-center">
      <Logo class="mr-16" />
      <Navigation />
      <LoginModal
        v-model:open="isLoginModalOpen"
        @open-register-modal="openModal('register')"
      />
      <RegisterModal
        v-model:open="isRegisterModalOpen"
        @open-login-modal="openModal('login')"
      />
    </div>
  </header>
</template>
