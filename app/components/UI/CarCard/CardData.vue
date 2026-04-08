<script setup lang="ts">
type Props = {
  title: string;
  location?: string;
  infoBullets: string[];
  minPrice: number;
  maxPrice?: number;
  discountedPrice?: number;
  priceFormat?: Intl.NumberFormatOptions;
};

const props = defineProps<Props>();

const priceRange = computed(() => {
  const minPrice = formatCurrency(props.minPrice, props.priceFormat);

  if (!props.maxPrice) {
    return minPrice;
  }

  const maxPrice = formatCurrency(props.maxPrice, props.priceFormat);

  return `${minPrice} - ${maxPrice}`;
});

const discountedPrice = computed(() => {
  if (!props.discountedPrice) {
    return;
  }

  return formatCurrency(props.discountedPrice, props.priceFormat);
});
</script>

<template>
  <div class="relative flex flex-col space-y-4.5">
    <div>
      <span v-if="location" class="inline-flex gap-1 items-center mb-1.5 text-dimmed">
        <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />
        {{ location }}
      </span>

      <h3 class="text-lg font-bold">
        {{ title }}
      </h3>
    </div>

    <div class="flex flex-wrap gap-2">
      <UBadge
        v-for="(bullet, index) in infoBullets"
        :key="index"
        color="secondary"
        :label="bullet "
      />
    </div>

    <div class="space-x-2 mt-auto">
      <span v-if="discountedPrice" class="text-dimmed font-medium line-through">{{ priceRange }}</span>
      <span class="text-black text-lg font-bold">{{ discountedPrice || priceRange }}</span>
    </div>
  </div>
</template>
