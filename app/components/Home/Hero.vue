<script setup lang="ts">
defineProps<{ totalCars?: number; }>();

const filters = ref({
  price: undefined as string | undefined,
  body: undefined as string | undefined,
  transmission: undefined as string | undefined,
  brand: undefined as string | undefined,
});

const priceOptions = [
  {
    label: "500 000 – 2 000 000 грн",
    value: "500000-2000000",
  },
];

const bodyOptions = [
  {
    label: "Всі",
    value: "all",
  },
];

const transmissionOptions = [
  {
    label: "Всі",
    value: "all",
  },
];

const brandOptions = [
  {
    label: "Всі",
    value: "all",
  },
];
</script>

<template>
  <section
    class="hero-section h-[calc(100vh-72px)] text-inverted bg-cover relative flex flex-col justify-end pb-20"
  >
    <div class="hero-overlay z-0 absolute inset-0" />

    <div class="container z-10">
      <h1
        class="text-4xl md:text-5xl lg:text-[80px] font-bold break-all sm:break-normal mb-6"
      >
        Легкий шлях
        <br>
        до нового авто
      </h1>

      <p class="text-2xl font-medium text-toned mb-12">
        Переглядайте, порівнюйте, обирайте та купуйте — все в одному місці.
      </p>

      <UForm :state="{}" class="flex items-center gap-6 p-4 bg-default">
        <UFormField label="Ціна" class="basis-52">
          <USelect
            v-model="filters.price"
            :items="priceOptions"
            placeholder="500 000 – 2 000 000 грн"
            variant="ghost"
            trailing-icon=""
          />
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Кузов" class="basis-52">
          <USelect
            v-model="filters.body"
            :items="bodyOptions"
            placeholder="Всі"
            variant="ghost"
            trailing-icon=""
          />
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Трансмісія" class="basis-52">
          <USelect
            v-model="filters.transmission"
            :items="transmissionOptions"
            placeholder="Всі"
            variant="ghost"
            trailing-icon=""
          />
        </UFormField>

        <USeparator orientation="vertical" class="h-12" />

        <UFormField label="Марка" class="basis-52">
          <USelect
            v-model="filters.brand"
            :items="brandOptions"
            placeholder="Всі"
            variant="ghost"
            trailing-icon=""
          />
        </UFormField>

        <UButton
          :label="`Переглянути ${totalCars} авто`"
          size="lg"
          block
          color="primary"
          class="basis-64"
        />
      </UForm>
    </div>
  </section>
</template>

<style>
.hero-section {
  background-image: url("/images/hero-section-bg.png");
}

.hero-overlay {
  background: linear-gradient(198.75deg, rgba(0, 0, 0, 0) 42.76%, rgba(0, 0, 0, 0.6) 74.89%);
}
</style>
