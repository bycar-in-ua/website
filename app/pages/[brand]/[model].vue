<script setup lang="ts">
const route = useRoute();

navigateTo({
  name: "SingleCar",
  params: { slug: route.params.model },
}, { redirectCode: 301 });
</script>
