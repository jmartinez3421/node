const Task = require('./task');

class Tasks {
	_taskList = {};

	constructor() {
		this._taskList = {};
	}

	get taskList() {
		return { ...this._taskList };
	}

	get taskListArr() {
		const taskList = [];

		Object.keys(this._taskList).forEach((key) => {
			taskList.push(this._taskList[key]);
		});

		return taskList;
	}

	setTaskList(data) {
		this._taskList = data;
	}

	createTask(desc) {
		const task = new Task(desc);
		this._taskList[task.id] = task;
	}

	listTasks() {
		console.log('\nTASKS LIST\n'.underline.green);
		this.taskListArr.forEach((task, i) => {
			const index = `${i + 1}. `.green;
			const { desc, completed } = task;
			const isCompleted = !completed ? 'Pending'.red : 'Completed'.green;
			console.log(index + desc + ' :: ' + isCompleted);
		});
	}

	listCompletedOrPendent(complete) {
		console.log(`\nTASKS LIST (${complete ? 'COMPLETED' : 'PENDENT'}) \n`.underline.green);

		let i = 1;
		this.taskListArr.forEach((task) => {
			const index = `${i}. `.green;
			const { desc, completed } = task;
			const isCompleted = !completed ? 'Pending'.red : completed.green;
			const output = index + desc + ' :: ' + isCompleted;

			if (complete && completed !== null) {
				console.log(output);
				i++;
			} else if (!complete && completed === null) {
				console.log(output);
				i++;
			}
		});
	}

    deleteTask( id ){
        if(this._taskList[id]) {
            delete this._taskList[id];
			console.log('\nTask deleted!!'.green);
        }
    }

	toggleCompleted( ids ){

		ids.forEach( id => {
			const task = this._taskList[id];
			if(!task.completed){
				task.completed = new Date().toISOString();
			}
		} );

		this.taskListArr.forEach( task => {
			if( !ids.includes(task.id)){
				this._taskList[task.id].completed = null;
			}
		} )

	}
}

module.exports = Tasks;
