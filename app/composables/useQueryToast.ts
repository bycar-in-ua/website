import type { Toast } from "@nuxt/ui/composables/useToast.js";

export function useQueryToast(): Partial<Toast> | null {
  const { currentRoute, replace } = useRouter();

  const toastColor = currentRoute.value.query.toast;

  if (!toastColor) {
    return null;
  }

  const toastMessage = currentRoute.value.query.message as string;

  const cleanQuery = { ...currentRoute.value.query };
  delete cleanQuery.toast;
  delete cleanQuery.message;

  replace({
    path: currentRoute.value.path,
    query: cleanQuery,
  });

  return {
    color: toastColor as Toast["color"],
    description: toastMessage,
  };
}
