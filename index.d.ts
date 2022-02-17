declare module "#app" {
  interface NuxtApp {
    $cdnLink(path: string, width: number, height: number): string;
  }
}

export {};
