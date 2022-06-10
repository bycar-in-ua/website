import { VNode } from "nuxt/dist/app/compat/capi";

export interface ShortSummary {
  name: string;
  value: string;
}

export interface VehicleTabs {
  name: string | number;
  title: string;
  content: VNode | Function | string;
}
