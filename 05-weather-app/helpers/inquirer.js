const inquirer = require('inquirer');
require('colors');

const menuOpt = [
	{
		type: 'list',
		name: 'option',
		message: 'What do you want to do?'.green,
		choices: [
			{
				value: 1,
				name: `${'1.'.green} Search city`,
			},
			{
				value: 2,
				name: `${'2.'.green} History`,
			},
			{
				value: 0,
				name: `${'0.'.green} Exit`,
			}
		],
		loop: false,
		pageSize: 3,
	},
];

const pauseOpt = [
	{
		type: 'input',
		name: 'continue',
		message: `Press ${'ENTER'.green} to continue\n`,
	},
];

const inquirerMenu = async () => {
	console.clear();

	console.log('================================'.green);
	console.log('        Select an option');
	console.log('================================\n'.green);

	const opt = await inquirer.prompt(menuOpt);

	return opt.option;
};

const inquirerPause = async () => {
	console.log('\n');
	await inquirer.prompt(pauseOpt);
};

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) {
					return 'Please, enter a value'.red;
				}
				return true;
			},
		},
	];

	console.log('\n');

	const { desc } = await inquirer.prompt(question);

	return desc;
};

const listPlaces = async (list, msg) => {
	let choices = list.map((item, i) => {
		return {
			value: item.id,
			name: `${i + 1}. `.green + item.name,
		};
	});

	choices.push({
		value: 0,
		name: '0. '.green + 'Cancel'
	})

	const question = [
		{
			type: 'list',
			name: 'item',
			message: msg,
			choices,
		},
	];

	console.log('\n');
	const { item } = await inquirer.prompt(question);

	return item;
};





module.exports = {
	inquirerMenu,
	inquirerPause,
	readInput,
	listPlaces
};
