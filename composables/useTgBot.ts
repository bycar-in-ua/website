import { Bot } from "grammy";

let bot: Bot;

export function useTgBot(token: string) {
  if (!bot) {
    bot = new Bot(token);
  }

  return bot;
}
