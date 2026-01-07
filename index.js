const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log('BOT IS ONLINE');
});

client.on('guildMemberAdd', async (member) => {
  console.log(DEBUG: ${member.user.tag} joined);

  try {
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Background image
    const background = await Canvas.loadImage(
      'https://i.postimg.cc/3Ryb0GkD/IMG-20251128-144143-389.jpg'
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Avatar
    const avatar = await Canvas.loadImage(
      member.displayAvatarURL({ extension: 'png', size: 256 })
    );

    const size = 100;
    const x = 50;
    const y = canvas.height / 2 - size / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, x, y, size, size);
    ctx.restore();

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'welcome.png'
    });

    const channel = member.guild.channels.cache.get('1446661159326584894');
    if (!channel) return;

    await channel.send(
      Hey **${member.displayName}**, welcome to **PARLAYS ENERGY** 🏀🏈⚽️ (let’s eat!)
Check out #rules and explore the server 👊
    );

    await channel.send({ files: [attachment] });

  } catch (err) {
    console.error('WELCOME ERROR:', err);
  }
});

client.login(process.env.TOKEN);