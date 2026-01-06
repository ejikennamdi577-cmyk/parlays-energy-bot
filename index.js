const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

// Create client with intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot ready event
client.once('clientReady', () => {
  console.log('BOT IS ONLINE');
});

// WELCOME CARD + PLAIN TEXT
client.on('guildMemberAdd', async (member) => {
  try {
    // DEBUG
    console.log(DEBUG: ${member.user.tag} joined);

    // Create canvas
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    // Load server banner as background
    const background = await Canvas.loadImage('https://i.postimg.cc/3Ryb0GkD/IMG-20251128-144143-389.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Load member avatar
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

    // Convert canvas to attachment
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });

    // Send messages in the welcome channel
    const channel = member.guild.channels.cache.get('1446661159326584894');
    if (channel) {
      // Plain text welcome (no ping)
      channel.send(Hey ${member.displayName}, welcome to PARLAYS ENERGY 🏀🏈⚽️ (let's eat)!
Check out #rules and all channels in the server, feel the love and vibes);

      // Image card
      channel.send({ files: [attachment] });
    }

  } catch (err) {
    console.error('Error creating welcome card:', err);
  }
});

// Login with token from environment variable
client.login(process.env.TOKEN);