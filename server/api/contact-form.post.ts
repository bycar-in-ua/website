import * as v from "valibot";
import { phoneRegex } from "#shared/validation";
import { getTgBot } from "#server/utils/get-tg-bot";

const contactFormSchema = v.object({
  name: v.string(),
  phone: v.pipe(v.string(), v.regex(phoneRegex, "Недійсний номер телефону")),
  request: v.optional(v.string()),
  message: v.optional(v.string()),
  page: v.string(),
  userId: v.optional(v.number()),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const bot = getTgBot(event);

  const { page, ...body } = await readValidatedBody(event, (data: unknown) => v.parse(contactFormSchema, data));

  const isProduction = process.env.NODE_ENV === "production";

  const prefix = isProduction ? "" : "STAGING";

  const message = [
    `Новий лід 📞`,
    `\n<b>Ім'я:</b> ${body.name}`,
    `<b>Телефон:</b> ${body.phone}`,
    `<b>Сторінка:</b> ${[prefix, page].join(" ").trim()}`,
    `<b>Запит:</b> ${body.request || "-"}`,
    `<b>Повідомлення:</b> ${body.message || "-"}`,
    `\nШвидше виходь на зв'язок!`,
  ].join("\n");

  await bot.api.sendMessage(
    config.public.tgLeadsChannelId,
    message,
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
