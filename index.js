const { Client, GatewayIntentBits } = require('discord.js');
const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');

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

// WELCOME CARD (image only) + plain text (no ping)
client.on('guildMemberAdd', async member => {
  try {
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Server banner background
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1454876214513897617/1456649379950624831/IMG_20251128_144143_389.jpg?ex=695921f3&is=6957d073&hm=4d982d55ef4af38bdb18473914c56f4997f875d7aed1ac7ac0563f880166b5d5&');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Optional: user avatar
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

    // Convert canvas to image attachment
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });

    // Channel to send
    const channel = member.guild.channels.cache.get('1446661159326584894');
    if (channel) {
      // 1️⃣ Send plain welcome text (no ping)
      channel.send(
        'Hey ' + member.displayName + ' welcome to PARLAYS ENERGY 🏀🏈⚽ (let\'s eat)!\n' +
        'Check out #rules and all channels in the server, feel the love and vibes'
      );

      // 2️⃣ Send image card
      channel.send({ files: [attachment] });
    }

  } catch (err) {
    console.log('Error creating welcome card:', err);
  }
});

client.login(process.env.TOKEN);