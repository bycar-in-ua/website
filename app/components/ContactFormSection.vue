<script setup lang="ts">
import ContactForm from "./ContactForm.vue";

withDefaults(defineProps<{
  page: string;
  tgLinkMessage?: string;
  showAffix?: boolean;
}>(), { showAffix: true });
</script>

<template>
  <section
    id="contact-container"
    class="contact-form-section px-4 py-12 sm:p-20"
  >
    <div
      class="text-white flex flex-col sm:flex-row gap-6 sm:gap-10 items-stretch"
    >
      <div class="grow flex flex-col">
        <h3 class="text-4xl md:text-5xl font-bold mb-29.75 sm:mb-auto">
          <span class="text-primary">Допоможемо</span> визначитися
          <br>
          з авто
        </h3>
        <p class="text-xl font-semibold mt-auto text-gray-200">
          і не будемо радити зайве
        </p>
      </div>

      <ContactForm :page class="mx-auto" />
    </div>
  </section>
</template>

<style>
.contact-form-section {
  background-image: url('/images/contact-form-bg-1.jpg'), linear-gradient(90deg,rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center center;
}
</style>
