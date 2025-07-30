<script setup lang="ts">
import SectionContainer from "../../components/SectionContainer.vue";
import EmailForm from "../../components/EmailForm.vue";
import PhoneForm from "../../components/PhoneForm.vue";
</script>

<template>
  <SectionContainer title="Безпека">
    <EmailForm />

    <USeparator class="my-6" />

    <PhoneForm />
  </SectionContainer>
</template>
