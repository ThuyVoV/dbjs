const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// returns an array of subfolders
const commandFolders = fs.readdirSync("./commands");

// const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	// remove prefix and create array of each word
	const args = message.content.slice(prefix.length).trim().split(/ +/);

	// return first element in array and remove it from array
	const commandName = args.shift().toLowerCase();

	// if command doesnt exist return, otherwise assign the command and excute
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	// cmd cant be used in DM check
	if (command.guildOnly && message.channel.type === "dm") {
		return message.reply("Can't use this cmd in DM");
	}

	// if command has "args: true" in the file it WILL check for arguments here
	// sends the "usage" message as well, providing addition info on command
	if (command.args && !args.length) {
		let reply = `You didnt provide argument ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be:\n\`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	try {
		// try to execute command
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply("error trying to exceute that command");
	}
});

client.on('message', message => {
	console.log(message.content);
});

// login to Discord with your app's token
client.login(token);

// WFMZV92 a