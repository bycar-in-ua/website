<template>
  <UFormField
    :ui="{
      root: 'flex items-center gap-8',
      labelWrapper: 'w-80',
      container: 'w-lg',
    }"
  >
    <slot />
  </UFormField>
</template>
