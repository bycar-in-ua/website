import { updatePersonalInput } from "@bycar-in-ua/auth-sdk";
import { parse } from "valibot";
import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (data) => parse(updatePersonalInput, data));
  const authService = await getAuthService(event);

  const result = await authService.updatePersonalData(body);

  const session = await getUserSession(event);
  await replaceUserSession(event, {
    user: { data: result },
    secure: session.secure,
  });

  return result;
});
