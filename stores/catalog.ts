import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalog", () => {
  const router = useRouter();

  const filters = ref<Record<string, string | string[] | undefined>>(
    router.currentRoute.value.query as Record<string, string>,
  );

  const { status, data } = useFetch(`/api/search-cars`, {
    method: "post",
    body: filters,
    default: () => ({
      items: [],
      meta: {
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 12,
        totalItems: 0,
      },
    }),
  });

  const pending = computed(() => status.value === "pending");

  const updateFilters = async (field: string, value: string | string[]) => {
    filters.value = { ...filters.value, page: "1", [field]: value };

    await router.replace({
      query: filters.value,
    });
  };

  return {
    filters,
    pending,
    data,
    updateFilters,
  };
});
