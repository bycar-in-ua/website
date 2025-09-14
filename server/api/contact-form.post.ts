import { useTgBot } from "~~/app/composables/useTgBot";

type ContacFormPayload = {
  name: string;
  phone: string;
  page: string;
  userId?: number;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const bot = useTgBot(config.public.tgBotToken);

  const { page, ...body } = await readBody<ContacFormPayload>(event);

  const isProduction = process.env.NODE_ENV === "production";

  const prefix = isProduction ? "" : "STAGING";

  await bot.api.sendMessage(
    config.public.tgLeadsChannelId,
    `Новий лід 📞\n\n<b>Ім'я:</b> ${body.name}\n<b>Телефон:</b> ${
      body.phone
    }\n<b>Сторінка:</b> ${[prefix, page]
      .join(" ")
      .trim()}\n\nШвидше виходь на зв'язок!`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Копіювати телефон",
              copy_text: { text: body.phone },
            },
          ],
        ],
      },
    },
  );
  setResponseStatus(event, 201);
});
