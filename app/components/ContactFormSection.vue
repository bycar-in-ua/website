<script setup lang="ts">
import ContactForm from "./ContactForm.vue";

defineProps<{
  page: string;
  tgLinkMessage?: string;
}>();
</script>

<template>
  <section
    id="contact-container"
    class="contact-form-section py-12 sm:py-16 md:py-20"
  >
    <div
      class="text-white flex flex-col sm:flex-row gap-6 sm:gap-10 items-stretch container"
    >
      <div class="flex flex-col sm:basis-1/2 md:basis-auto md:grow">
        <h3 class="text-4xl md:text-5xl font-bold mb-30 sm:mb-auto">
          <span class="text-primary">Допоможемо</span> визначитися
          <br>
          з авто
        </h3>
        <p class="text-lg md:text-xl font-semibold mt-auto text-gray-200">
          і не будемо радити зайве
        </p>
      </div>

      <ContactForm :page class="sm:basis-1/2 md:basis-auto" />
    </div>
  </section>
</template>

<style>
@reference "../assets/css/global.css";

.contact-form-section {
  background-image: var(--contact-form-section-bg), linear-gradient(90deg,rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center center;

  --contact-form-section-bg: url('/images/contact-form-bg.jpg');
}

@media (min-width: theme(--breakpoint-sm)) {
  .contact-form-section {
    --contact-form-section-bg: url('/images/contact-form-bg-wide.jpg');
  }
}
</style>
