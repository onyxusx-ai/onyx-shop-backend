ONYX SHOP BACKEND

Файлы:
- package.json
- index.js

Что ставить в переменные окружения:
- BOT_TOKEN=токен от BotFather
- ADMIN_CHAT_ID=твой chat id
- WEBHOOK_URL=https://твой-сервис.onrender.com

Как узнать ADMIN_CHAT_ID:
1. Напиши своему боту /start
2. Временно добавь в index.js это:
   bot.on("message", (msg) => console.log("CHAT_ID:", msg.chat.id));
3. Посмотри логи Render/Railway
4. Скопируй chat id и вставь в ADMIN_CHAT_ID

Как отправлять заказ с фронта:
POST /api/order
Content-Type: application/json

Пример body:
{
  "customerName": "Артур",
  "customerContact": "@onyxusx",
  "customerComment": "Нужна доставка в Москву",
  "total": 11998,
  "source": "Telegram Mini App",
  "items": [
    {
      "name": "CORTEIZ HOODIE",
      "size": "M",
      "qty": 1,
      "priceRub": 2999
    },
    {
      "name": "MM6 × SALOMON",
      "size": "42",
      "qty": 1,
      "priceRub": 8999
    }
  ]
}

Если хочешь, следующим сообщением я дам тебе готовый кусок JS для index.html,
который будет слать заказ именно в этот backend.
