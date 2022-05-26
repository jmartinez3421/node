const createMultiplicationTable = require('./helpers/multiply');
const argv = require('./config/yargs');

require('colors');

console.clear();

//BAD
// const [,,arg3 = 'base=5'] = process.argv;
// const [, base = 5] = arg3.split('=');

console.log(argv);

// const base = 2;
createMultiplicationTable(argv.b, argv.l, argv.lt)
	.then((fileName) => console.log(`File ${fileName} created!!!`.green))
	.catch((err) => console.log(`ERROR: ${err}`));
