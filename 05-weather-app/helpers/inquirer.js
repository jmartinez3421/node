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
				name: `${'1.'.green} Create task`,
			},
			{
				value: 2,
				name: `${'2.'.green} List tasks`,
			},
			{
				value: 3,
				name: `${'3.'.green} List completed tasks`,
			},
			{
				value: 4,
				name: `${'4.'.green} List pending tasks`,
			},
			{
				value: 5,
				name: `${'5.'.green} Complete task(s)`,
			},
			{
				value: 6,
				name: `${'6.'.green} Delete task`,
			},
			{
				value: 0,
				name: `${'0.'.green} Exit\n`,
			},
		],
		loop: false,
		pageSize: 8,
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

const deleteItemFromList = async (list, msg) => {
	let choices = list.map((item, i) => {
		return {
			value: item.id,
			name: `${i + 1}. `.green + item.desc,
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

const confirm = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	];

	console.log('\n');

	const { ok } = await inquirer.prompt(question);

	return ok;
}

const completeTasksFromList = async (list) => {
	let choices = list.map((item, i) => {
		return {
			value: item.id,
			name: `${i + 1}. `.green + item.desc,
			checked: (item.completed) ? true : false
		};
	});

	const question = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Select the tasks that you want to complete'.green,
			choices,
		},
	];

	console.log('\n');
	const { ids } = await inquirer.prompt(question);

	return ids;
};

module.exports = {
	inquirerMenu,
	inquirerPause,
	readInput,
	deleteItemFromList,
	confirm,
	completeTasksFromList
};
