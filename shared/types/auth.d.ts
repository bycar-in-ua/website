import type { ReducedUser } from "@bycar-in-ua/auth-sdk";

declare module "#auth-utils" {
  interface User {
    id: ReducedUser["id"];
    email?: ReducedUser["email"];
    phone?: ReducedUser["phone"];
    firstName?: ReducedUser["firstName"];
    lastName?: ReducedUser["lastName"];
  };

  interface SecureSessionData {
    accessToken: string;
    refreshToken: string;
  }
}

export {};
