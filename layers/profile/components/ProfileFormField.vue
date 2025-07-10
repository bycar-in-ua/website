<template>
  <UFormField
    :ui="{
      root: 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8',
      wrapper: 'sm:w-1/3 lg:w-80',
      container: 'max-w-lg w-full',
    }"
  >
    <slot />
  </UFormField>
</template>
