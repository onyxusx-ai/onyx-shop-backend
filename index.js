{\rtf1\ansi\ansicpg1251\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab560
\pard\pardeftab560\slleading20\partightenfactor0

\f0\fs26 \cf0 const express = require("express");\
const TelegramBot = require("node-telegram-bot-api");\
const cors = require("cors");\
\
const BOT_TOKEN = process.env.BOT_TOKEN;\
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;\
const WEBHOOK_URL = process.env.WEBHOOK_URL;\
const PORT = process.env.PORT || 3000;\
\
const app = express();\
app.use(cors());\
app.use(express.json());\
\
const bot = new TelegramBot(BOT_TOKEN, \{ webHook: true \});\
\
// \uc0\u1090 \u1077 \u1089 \u1090 \
app.get("/", (req, res) => \{\
  res.send("ONYX BACKEND WORKING");\
\});\
\
// \uc0\u1087 \u1086 \u1083 \u1091 \u1095 \u1077 \u1085 \u1080 \u1077  \u1079 \u1072 \u1082 \u1072 \u1079 \u1072 \
app.post("/api/order", async (req, res) => \{\
  try \{\
    const \{ items, total \} = req.body;\
\
    let text = `\uc0\u55357 \u56613  \u1053 \u1054 \u1042 \u1067 \u1049  \u1047 \u1040 \u1050 \u1040 \u1047 \\n\\n`;\
\
    items.forEach((item, i) => \{\
      text += `$\{i + 1\}. $\{item.name\}\\n`;\
      text += `\uc0\u1056 \u1072 \u1079 \u1084 \u1077 \u1088 : $\{item.size\}\\n`;\
      text += `\uc0\u1050 \u1086 \u1083 -\u1074 \u1086 : $\{item.qty\}\\n`;\
      text += `\uc0\u1062 \u1077 \u1085 \u1072 : $\{item.priceRub\}\u8381 \\n\\n`;\
    \});\
\
    text += `\uc0\u55357 \u56496  \u1048 \u1058 \u1054 \u1043 \u1054 : $\{total\}\u8381 `;\
\
    await bot.sendMessage(ADMIN_CHAT_ID, text);\
\
    res.json(\{ ok: true \});\
  \} catch (e) \{\
    console.log(e);\
    res.status(500).json(\{ ok: false \});\
  \}\
\});\
\
// webhook\
app.post(`/bot$\{BOT_TOKEN\}`, (req, res) => \{\
  bot.processUpdate(req.body);\
  res.sendStatus(200);\
\});\
\
// \uc0\u1087 \u1086 \u1083 \u1091 \u1095 \u1077 \u1085 \u1080 \u1077  chat id\
bot.on("message", (msg) => \{\
  console.log("CHAT_ID:", msg.chat.id);\
\});\
\
app.listen(PORT, async () => \{\
  console.log("Server started");\
\
  if (WEBHOOK_URL) \{\
    await bot.setWebHook(`$\{WEBHOOK_URL\}/bot$\{BOT_TOKEN\}`);\
  \}\
\});}