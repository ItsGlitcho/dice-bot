import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Bot is online!");

  // Delay first ping by 5 minutes, then ping every 10 minutes
  setTimeout(() => {
    setInterval(() => {
      fetch("https://dice-bot-k3vm.onrender.com")
        .then(() => console.log("Self ping sent!"))
        .catch((err) => console.error("Self ping failed:", err));
    }, 5 * 60 * 1000); // 5 minutes
  }, 5 * 60 * 1000); // 5 minutes delay before first ping
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
