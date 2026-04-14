const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const bot = new TelegramBot(BOT_TOKEN, { webHook: true });
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await bot.sendMessage(chatId, "Пожалуйста нажмите кнопку снизу⬇️");
});

  bot.sendMessage(chatId, `
🔥 ONYX SHOP

Добро пожаловать!

⚡ У нас ты найдёшь:
— стильную одежду  
— аксессуары (Goyard, Corteiz и др.)  
— быстрый заказ  

👇 Жми кнопку ниже и открывай магазин
  `, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🛍 Открыть магазин",
            web_app: {
              url: "https://onyxusx-ai.github.io/onyx-shop-miniapp/"
            }
          }
        ]
      ]
    }
  });
});
// тест
app.get("/", (req, res) => {
  res.send("ONYX BACKEND WORKING");
});

// получение заказа
app.post("/api/order", async (req, res) => {
  try {
    const {
      items = [],
      total = 0,
      customerName = "Не указано",
      customerContact = "Не указано",
      customerComment = "Без комментария"
    } = req.body;

    let text = `🔥 НОВЫЙ ЗАКАЗ\n\n`;

    items.forEach((item, i) => {
      text += `${i + 1}. ${item.name}\n`;
      text += `Размер / цвет: ${item.size}\n`;
      text += `Кол-во: ${item.qty}\n`;
      text += `Цена: ${item.priceRub}₽\n\n`;
    });

    text += `💰 ИТОГО: ${total}₽\n\n`;
    text += `👤 Имя: ${customerName}\n`;
    text += `📞 Контакт: ${customerContact}\n`;
    text += `📝 Комментарий: ${customerComment}`;

    await bot.sendMessage(ADMIN_CHAT_ID, text);

    res.json({ ok: true });
  } catch (e) {
    console.log("ORDER ERROR:", e);
    res.status(500).json({ ok: false });
  }
});

// webhook
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// получение chat id
bot.on("message", (msg) => {
  console.log("CHAT_ID:", msg.chat.id);
});
app.get("/send-channel-post", async (req, res) => {
  try {
    await bot.sendMessage(
      "@onyxshoptg",
      `🔥 ONYX SHOP

Теперь заказывать стало ещё проще.

👇 Жми кнопку ниже и переходи в магазин`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🛍 Открыть магазин",
                url: "https://onyxusx-ai.github.io/onyx-shop-miniapp/"
              }
            ],
            [
              {
                text: "📩 Написать админу",
                url: "https://t.me/onyxshopadmin"
              }
            ]
          ]
        }
      }
    );

    res.send("OK");
  } catch (e) {
    console.log(e);
    res.status(500).send("ERROR");
  }
});
app.listen(PORT, async () => {
  console.log("Server started");

  if (WEBHOOK_URL) {
    await bot.setWebHook(`${WEBHOOK_URL}/bot${BOT_TOKEN}`);
  }
});
