// index.js
require('dotenv').config(); // Make sure .env has TOKEN=your_token_here
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('clientReady', () => {
  console.log('BOT IS ONLINE');
});

// WELCOME MESSAGE + IMAGE CARD
client.on('guildMemberAdd', async member => {
  try {
    const channel = member.guild.channels.cache.get('1446661159326584894');
    if (!channel) return;

    // 1️⃣ Send plain text welcome (no ping)
    channel.send(
      **Hey ${member.displayName}, welcome to PARLAYS ENERGY 🏀🏈⚽ (let's eat)!**\n +
      Check out #rules and all channels in the server, feel the love and vibes
    );

    // 2️⃣ Create the Canvas welcome card
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Background image from Postimg (public)
    const background = await Canvas.loadImage('https://i.postimg.cc/3Ryb0GkD/IMG-20251128-144143-389.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // User avatar
    const avatar = await Canvas.loadImage(member.displayAvatarURL({ extension: 'png' }));
    const avatarSize = 100;
    const avatarX = 50;
    const avatarY = canvas.height / 2 - avatarSize / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

    // Convert to attachment and send
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });
    channel.send({ files: [attachment] });

  } catch (err) {
    console.log('Error creating welcome card:', err);
  }
});

// Login using token from .env
client.login(process.env.TOKEN);