import type { SignInResponse, SignInStepResponse } from "@bycar-in-ua/auth-sdk";

export function isNextStepResponse(data: SignInResponse): data is SignInStepResponse {
  return (data as SignInStepResponse).nextStep !== undefined;
}
