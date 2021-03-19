module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	args: true,
	usage: "[arg 1] [arg 2] ... [arg n]",
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};