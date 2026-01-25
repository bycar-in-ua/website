import { getAuthService } from "../../utils/get-auth-service";

type GoogleOAuthTokens = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
};

export default defineOAuthGoogleEventHandler({
  config: {
    scope: [
      "email", "profile", "openid",
    ],
    authorizationParams: { access_type: "offline" },
  },
  async onSuccess(event, { tokens }) {
    const { access_token } = tokens as GoogleOAuthTokens;

    const authService = await getAuthService(event);

    const query = getQuery(event);

    try {
      const response = await authService.googleSignIn({ accessToken: access_token });

      await setUserSession(event, {
        user: {
          data: response.user,
          tokens: {
            access: response.accessToken,
            refresh: response.refreshToken,
          },
        },
      });

      const redirectTo = typeof query.redirect === "string" ? query.redirect : "/profile/personal";

      return sendRedirect(event, redirectTo);
    } catch (error) {
      console.error("Failed to authenticate with Bycar API:", error);
      return sendRedirect(event, "/?toast=google-auth-error&toastColor=error");
    }
  },
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/?toast=google-auth-error&toastColor=error");
  },
});
