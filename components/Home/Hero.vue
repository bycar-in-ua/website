<template>
  <section class="flex blured-ellipse-bg relative">
    <div class="basis-3/5 flex flex-col justify-center items-start">
      <h1 class="text-5xl font-semibold mb-4">
        Обрати нове
        <span
          class="relative inline-block before:block before:absolute before:-z-10 before:w-28 before:h-28 before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-[45%] before:rounded-full before:bg-bycar-secondary-500"
        >
          авто
        </span>
        <br />
        - це просто
      </h1>
      <h2 class="text-base font-medium mb-12">
        Від мрії й до купівлі. Погнали зробимо це!
      </h2>

      <h3 class="mb-2">4 785 активних пропозицій</h3>
      <UButton
        icon="i-heroicons-magnifying-glass"
        trailing
        :to="{ name: 'catalog' }"
      >
        Пошук авто
      </UButton>
    </div>
    <div class="basis-2/5 min-h-[580px] flex flex-col justify-center">
      <div class="relative h-full w-[150%] -left-1/2 -z-20">
        <img
          src="/public/images/hero-image.png"
          class="absolute inset-0 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  </section>
</template>

<style>
.blured-ellipse-bg:after {
  content: "";
  position: absolute;
  bottom: 5%;
  left: 20%;
  width: 420px;
  height: 230px;
  border-radius: 50%;
  z-index: -30;
  @apply shadow-primary bg-primary blur-3xl opacity-10;
}
</style>
