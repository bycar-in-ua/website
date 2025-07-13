<script setup lang="ts">
import SectionContainer from "./SectionContainer.vue";
import EmailForm from "./EmailForm.vue";
import PhoneForm from "./PhoneForm.vue";
</script>

<template>
  <SectionContainer title="Безпека">
    <EmailForm />

    <USeparator class="my-6" />

    <PhoneForm />
  </SectionContainer>
</template>
