const employees = [
	{
		id: 1,
		name: 'Jordi',
	},
	{
		id: 2,
		name: 'Anna',
	},
	{
		id: 3,
		name: 'Maria',
	},
];

const wages = [
	{
		id: 1,
		wage: 1000,
	},
	{
		id: 2,
		wage: 500,
	},
];

const getEmployee = (id, callback) => {
	const employee = employees.find((e) => e.id === id)?.name;

	if (employee) {
		callback(null, employee);
	} else {
		callback(`The employee with the id ${id} doesn't exists`);
	}
};

const getWage = (id, callback) => {
	const wage = wages.find((w) => w.id === id)?.wage;

	if (wage) {
		callback(null, wage);
	} else {
		callback(`The wage with the id ${id} doesn't exists`);
	}
};

const id = 3;

getEmployee(id, (err, employee) => {
	if (err) {
		console.log('ERROR!!!');
		return console.log(err);
	}

	getWage(id, (err, wage) => {
        if(err){
            console.log('ERROR!!!');
            return console.log(err);
        }
    
        console.log('The employee: ', employee, ' has a wage of: ', wage);
    })
});

