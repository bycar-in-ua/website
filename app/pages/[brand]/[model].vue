<script setup lang="ts">
/**
 * @deprecated This page is deprecated but kept here for SEO transition. It will be removed in the future.
 */

const route = useRoute();

navigateTo({
  name: "SingleCar",
  params: { slug: route.params.model },
}, { redirectCode: 301 });
</script>
