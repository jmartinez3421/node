require('colors');

const { inquirerMenu, inquirerPause, readInput, deleteItemFromList, confirm, completeTasksFromList } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/manageFiles');
const Tasks = require('./models/tasks');

const main = async () => {
	let opt = '';

	const tasks = new Tasks();
	const dbTasks = readDB();

	if (dbTasks) {
		tasks.setTaskList(dbTasks);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case 1:
				const desc = await readInput('Description of the task: '.green);
				tasks.createTask(desc);
				break;

			case 2:
				tasks.listTasks();
				break;

			case 3:
				tasks.listCompletedOrPendent(true);
				break;

			case 4:
				tasks.listCompletedOrPendent(false);
				break;

			case 5:
				const tasksToComplete = await completeTasksFromList(tasks.taskListArr);
				tasks.toggleCompleted(tasksToComplete);
				break;

			case 6:
				const itemToDelete = await deleteItemFromList(
					tasks.taskListArr,
					'Select the task you want to delete'.green
				);
				if (itemToDelete !== 0) {
					const ok = await confirm('Are you sure?');
					if (ok) {
						tasks.deleteTask(itemToDelete);
					}
				}
				break;
			default:
				break;
		}

		saveDB(tasks.taskList);

		if (opt !== 0) {
			await inquirerPause();
		}
	} while (opt !== 0);
};

main();
