import type { VehicleView } from "@bycar-in-ua/common";
import { useBycarApi } from "~/composables/useBycarApi";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    await sendRedirect(event, "/", 302);
  }

  const bycarApi = useBycarApi();

  const vehicle = await bycarApi<VehicleView>(`/vehicles/${slug}`);

  if (!vehicle) {
    await sendRedirect(event, "/", 302);
  }

  return vehicle;
});
