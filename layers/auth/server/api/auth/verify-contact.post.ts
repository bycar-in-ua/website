import { verifyContactInput } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, (data) => v.parse(verifyContactInput, data));
  const authService = await getAuthService(event);

  const verifyContactResponse = await authService.verifyContact(payload);

  return verifyContactResponse;
});
