import type { VehicleView, PaginationMeta } from "@bycar-in-ua/common";
import { useBycarApi } from "~/composables/useBycarApi";

export default defineEventHandler(async (event) => {
  const bycarApi = useBycarApi();

  const body = await readBody(event);

  return bycarApi<{ items: VehicleView[]; meta: PaginationMeta }>("/vehicles", {
    query: body,
  });
});
