import { useState } from "#app";

export function useMenuShowing() {
  return useState<boolean>("mobileMenuShowing", () => false);
}
