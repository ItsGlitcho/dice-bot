// Import necessary modules
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
// const express = require("express");
// const app = express();

// Keep bot alive with an HTTP server
// app.get("/", (req, res) => {
//   res.send("Bot is running!");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rollCounts = {};
const rollStreaks = {};

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "!roll") {
    const result = Math.floor(Math.random() * 6) + 1;
    // const result = 1;
    let sentence;

    // Update roll count
    const key = `${message.member.id}-${result}`;
    console.log(message.member.id);
    if (!rollCounts[key]) {
      rollCounts[key] = 0;
    }
    rollCounts[key]++;

    // Track streaks
    const streakKey = `${message.member.id}-streak`;
    if (!rollStreaks[streakKey]) {
      rollStreaks[streakKey] = { number: result, count: 1 };
    } else {
      if (rollStreaks[streakKey].number === result) {
        rollStreaks[streakKey].count++;
      } else {
        rollStreaks[streakKey] = { number: result, count: 1 };
      }
    }

    // Sentences based on the result
    if (result >= 1 && result <= 3) {
      sentence = "Better luck next time!";
    } else if (result === 4 || result === 5) {
      sentence = "Not bad, almost there!";
    } else if (result === 6) {
      sentence = "Congrats! You are the winner! 🎉";
    }

    // Check for 3-in-a-row streak
    let streakMessage = "";
    if (rollStreaks[streakKey].count >= 3) {
      streakMessage = `\n🔥 Wow! ${message.member.displayName} rolled **${result}** three times in a row! 🔥`;
    }

    message.channel.send(
      `🎲 ${message.member.displayName} rolled a **${result}**!`
    );

    // message.channel.send(
    //   `🎲 ${message.member.displayName} rolled a **${result}**!
    //   \n${sentence}
    //   \nYou have rolled this number **${rollCounts[key]}** time(s)!${streakMessage}`
    // );
  }
});

client.login(process.env.TOKEN);
