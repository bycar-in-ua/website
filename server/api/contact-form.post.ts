type ContacFormPayload = {
  name: string;
  phone: string;
  page: string;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { page, ...body } = await readBody<ContacFormPayload>(event);

  const isProduction = process.env.NODE_ENV === "production";

  const prefix = isProduction ? "" : "STAGING";

  await $fetch("/lead", {
    method: "POST",
    baseURL: config.public.tgBotUrl,
    body: {
      ...body,
      page: [prefix, page].join(" ").trim(),
    },
  });

  setResponseStatus(event, 201);
});
