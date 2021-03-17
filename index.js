const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
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
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply("error trying to exceute that command");
	}
/*
	if (message.content.startsWith(`${prefix}ping`)) {
		// message.channel.send("Ping!");
		client.commands.get("ping").execute(message, args);
	}
	else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send("Boop.");
	}
	else if (message.content === `${prefix}server`) {
		 message.channel.send(`The server name is: ${message.guild.name}` +
		` with ${message.guild.memberCount} members`);

		client.commands.get("server").execute(message, args);
	}
	else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username} and ID: ${message.author.id}`);
	}
	else if (command === "args-info") {
		if (!args.length) {
			return message.channel.send(`no argument provided, ${message.author}`);
		}
		else if (args[0] === "foo") {
			return message.channel.send("bar");
		}
		message.channel.send(`first argument is: ${args[0]}`);
	}
	else if (command === "kick") {
		if (!message.mentions.users.size) {
			return message.reply("you need to tag someone to kick!");
		}

		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	else if (command === "avatar") {
		if (!message.mentions.users.size) {
			return message.channel.send(`avatar: ${message.author.displayAvatarURL({ format:"png", dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar ${user.displayAvatarURL({ format: "png", dynamic: true })}`;
		});
		message.channel.send(avatarList);
	}
	else if (command === "prune") {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return message.reply("that isn't a valid number");
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply("need to input a number between 1 and 99");
		}

		// throws error if trying to delete msg older than 2 weeks
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send("error trying to prune msgs in this channel");
		});
	}
	*/
});

client.on('message', message => {
	console.log(message.content);
});

// login to Discord with your app's token
client.login(token);