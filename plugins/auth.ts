import {
  AuthService,
  type CreateUserPayload,
  type LoginUserPayload,
} from "@bycar-in-ua/sdk";
import { ofetch } from "ofetch";

export default defineNuxtPlugin(() => {
  const accessToken = useCookie<string>("bycar-access-token"); // TODO: use variable from SDK
  const refreshToken = useCookie<string>("bycar-refresh-token"); // TODO: use variable from SDK
  const config = useRuntimeConfig();

  const authService = new AuthService(config.public.apiHost, ofetch);

  const login = async (payload: LoginUserPayload) => {
    return await authService.login(payload);
  };

  const register = async (payload: CreateUserPayload) => {
    return await authService.register(payload);
  };

  const logout = async () => {
    console.log("accessToken.value ", accessToken.value);

    await authService.logout();
  };

  const getUser = async () => {
    try {
      return await authService.authenticate();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const refresh = async () => {
    return await authService.refresh();
  };

  return {
    provide: {
      auth: {
        login,
        register,
        logout,
        getUser,
        refresh,
      },
    },
  };
});
