import { Bot } from "grammy";
import * as dotenv from "dotenv";

dotenv.config();
const token = process.env.BOT_TOKEN!;
if (!token) throw new Error("Missing BOT_TOKEN in .env");

console.log(token, 'token')

const bot = new Bot(token);

// 按 chat 记录上一条文本
const lastText = new Map<number, string>();

bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;
  const message_text = ctx.message.text || '';

  bot.api.sendMessage(chatId, message_text)

  lastText.set(chatId, ctx.message.text); // 更新“上一条”
});

bot.start();
