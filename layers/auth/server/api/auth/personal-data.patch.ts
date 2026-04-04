import { getAuthService } from "../../utils/get-auth-service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const authService = await getAuthService(event);

  const result = await authService.updatePersonalData(body);

  const session = await getUserSession(event);
  await replaceUserSession(event, {
    user: {
      data: {
        ...session.user?.data,
        ...body,
      },
    },
    secure: session.secure,
  });

  return result;
});
