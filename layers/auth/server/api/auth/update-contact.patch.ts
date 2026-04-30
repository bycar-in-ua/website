import { updateContactInput } from "@bycar-in-ua/auth-sdk";
import * as v from "valibot";
import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, (data: unknown) => v.parse(updateContactInput, data));
  const authService = await getAuthService(event);

  const updateContactResponse = await authService.updateContact(payload);

  return updateContactResponse;
});
