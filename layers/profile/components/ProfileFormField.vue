<template>
  <UFormField
    :ui="{
      root: 'flex flex-col sm:flex-row gap-2 sm:gap-8',
      wrapper: 'sm:w-1/3 lg:w-80',
      container: 'max-w-lg w-full',
      labelWrapper: 'my-2',
    }"
  >
    <slot />

    <template v-if="$slots.help" #help>
      <slot name="help" />
    </template>
  </UFormField>
</template>
