// require the discord.js module
const Discord = require('discord.js');

const { prefix, secret_passcodes, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send("Ping! " + secret_passcodes.bank);
	}
	else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send("Boop.");
	}
	if (message.content === `${prefix}server`) {
		message.channel.send(`The server name is: ${message.guild.name}` +
		` with ${message.guild.memberCount} members`);
	}
	else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username} and ID: ${message.author.id}`);
	}
});

client.on('message', message => {
	console.log(message.content);
});

// login to Discord with your app's token
client.login(token);