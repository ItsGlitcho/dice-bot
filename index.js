const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "!roll") {
    const result = Math.floor(Math.random() * 6) + 1;

    message.channel.send(
      `🎲 ${message.member.displayName} rolled a **${result}**!`
    );
  }
});

client.login(process.env.TOKEN);

// Simple Express server to keep Render happy
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is alive!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
