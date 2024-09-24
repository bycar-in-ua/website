<script setup lang="ts">
const model = defineModel<boolean>({ default: false });

const scrollListener = () => {
  model.value = window.scrollY > 50;
};

window.addEventListener("scroll", scrollListener);

onUnmounted(() => {
  window.removeEventListener("scroll", scrollListener);
});
</script>
