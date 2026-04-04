// TODO: phoneVerification is not yet implemented in @bycar-in-ua/auth-sdk.
// Add the method to the SDK and replace this stub.
export default defineEventHandler(async () => {
  throw createError({
    statusCode: 501,
    message: "Phone verification is not yet supported by the auth SDK",
  });
});
