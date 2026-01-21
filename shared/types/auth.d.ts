import type { ReducedUser } from "@bycar-in-ua/auth-sdk";

declare module "#auth-utils" {
  interface User {
    data: ReducedUser;

    tokens?: {
      access: string;
      refresh: string;
    };
  };
}

export {};
