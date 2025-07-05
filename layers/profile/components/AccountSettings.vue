<script setup lang="ts">
import PasswordSection from "./PasswordSection.vue";
import PersonalDataSection from "./PersonalDataSection.vue";

const { user } = useAuthStore();
</script>

<template>
  <div class="w-full grow space-y-18">
    <PersonalDataSection />
    <PasswordSection v-if="user && !user.source" />
  </div>
</template>
