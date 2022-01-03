import { useState } from "#app";

export default function () {
  return useState<boolean>("mobileMenuShowing", () => false);
}
