import { signInInput } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { isNextStepResponse } from "#layers/auth/utils/is-next-step-response";
import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, (data: unknown) => v.parse(signInInput, data));
  const authService = await getAuthService(event);

  const signInResponse = await authService.signIn(payload);

  if (!isNextStepResponse(signInResponse)) {
    await setUserSession(event, {
      user: { data: signInResponse.user },
      secure: {
        tokens: {
          access: signInResponse.accessToken,
          refresh: signInResponse.refreshToken,
        },
      },
    });
  }

  return signInResponse;
});
