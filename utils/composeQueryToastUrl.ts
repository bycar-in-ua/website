import type { ToastProps } from "@nuxt/ui";

type ComposeQueryToastParams = {
  url: string | URL;
  color: NonNullable<ToastProps["color"]>;
  message: string;
};

export function composeQueryToastUrl({
  url,
  color,
  message,
}: ComposeQueryToastParams): URL {
  const urlInstance = url instanceof URL ? url : new URL(url);

  urlInstance.searchParams.set("toast", color);
  urlInstance.searchParams.set("message", message);

  return urlInstance;
}
