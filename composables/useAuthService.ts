import { AuthService } from "@bycar-in-ua/sdk";

let authService: AuthService;

export const useAuthService = () => {
  if (!authService) {
    const config = useRuntimeConfig();
    authService = AuthService.create(config.public.apiHost);
  }

  return authService;
};
