import { CdnLink } from "./plugins/cdn";

declare module "#app" {
  interface NuxtApp {
    $cdnLink: CdnLink;
  }
}

export {};
