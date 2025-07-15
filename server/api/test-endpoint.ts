import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@bycar-in-ua/sdk";

export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = getCookie(event, REFRESH_TOKEN_COOKIE_NAME);

  console.group("Test endpoint");

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);

  console.log("EVENT", event);

  console.log("EVENT headers", event.node.req.headers);

  console.groupEnd();

  return { event };
});
