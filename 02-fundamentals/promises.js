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

const getEmployee = (id) => {
	return new Promise((resolve, reject) => {
		const employee = employees.find((e) => e.id === id);

		employee ? resolve(employee.name) : reject(`No employee with the id ${id}`);
	});
};

const getWage = (id) => {
	return new Promise((resolve, reject) => {
		const wage = wages.find((w) => w.id === id);

		wage ? resolve(wage.wage) : reject(`No wage with the id ${id}`);
	});
};

const id = 1;

// getEmployee(id)
// 	.then((employee) => console.log(employee))
// 	.catch((err) => console.log(err));

let name;
getEmployee(id)
    .then(employee =>  {
        name = employee;
        return getWage(id)
    })
    .then( wage => console.log(`The employee, ${name}, has a wage of ${wage}`))
    .catch(err => console.log(err));
