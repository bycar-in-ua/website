<template>
  <section class="my-24">
    <div class="flex gap-5 px-10 py-12">
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
        class="p-5 flex flex-col gap-4 shadow-xl rounded-2xl bg-white blured-ellipse-bg after:left-[-40%] after:bottom-[-30%] relative"
      >
        <UFormGroup>
          <UInput placeholder="Ваше ім’я" size="lg" />
        </UFormGroup>

        <UFormGroup>
          <UInput placeholder="Ваш номер телефону" size="lg" />
        </UFormGroup>

        <UButton icon="i-heroicons-phone" trailing block>
          Передзвоніть мені
        </UButton>
      </UForm>
    </div>
  </section>
</template>
