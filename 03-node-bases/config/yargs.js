const argv = require('yargs')
	.option('b', {
		alias: 'base',
		type: 'number',
		desc: 'Is the base of the multiplication table',
		demandOption: true,
	})
	.option('l', {
		alias: 'list',
		type: 'boolean',
		desc: 'Display multiplication table',
		default: false,
	})
	.option('lt', {
		alias: 'limit',
		type: 'number',
		desc: 'Limit of the Table',
		default: 10,
	})
	.check((argv) => {
		if (isNaN(argv.b)) {
			throw 'The base must be a number';
		} else {
			return true;
		}
	})
	.check((argv) => {
		if (isNaN(argv.lt)) {
			throw 'The limit must be a number';
		} else {
			return true;
		}
	})
    .argv;

module.exports = argv;
