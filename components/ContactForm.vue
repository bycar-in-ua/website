<script setup lang="ts">
import BluredEllipse from "@/components/UI/BluredEllipse.vue";

const formState = reactive({
  name: "",
  phone: "",
});
</script>

<template>
  <section
    class="md:my-24 flex flex-wrap md:flex-nowrap justify-center md:justify-normal gap-8 py-6 md:py-12 relative"
  >
    <BluredEllipse class="absolute w-[410px] h-[220px] right-14 -bottom-14 -z-10" />
    <div>
      <h3 class="text-2xl font-bold mb-2">
        Не впевнений, яке авто тобі підходить?<br />
        Запитай у експерта!
      </h3>
      <p class="text-base text-gray-500 mb-4">
        Сьогодні на зв'язку Артем. Справжній автофанат,<br />
        любить БМВ і свого песика Діка
      </p>
      <UButton
        icon="i-heroicons-chat-bubble-bottom-center"
        trailing
        variant="outline"
      >
        Написати в чат
      </UButton>
    </div>

    <UForm
      :state="formState"
      class="p-5 md:ml-auto flex flex-col gap-4 shadow-xl rounded-2xl bg-white sm:min-w-80"
    >
      <UFormGroup>
        <UInput placeholder="Ваше ім’я" size="lg" />
      </UFormGroup>

      <UFormGroup>
        <UInput placeholder="Ваш номер телефону" size="lg" type="tel" />
      </UFormGroup>

      <UButton icon="i-heroicons-phone" trailing block>
        Передзвоніть мені
      </UButton>
    </UForm>
  </section>
</template>
