import { Bot } from "grammy";
import type { H3Event } from "h3";

export function getTgBot(event: H3Event) {
  const config = useRuntimeConfig(event);

  return new Bot(config.public.tgBotToken);
}
