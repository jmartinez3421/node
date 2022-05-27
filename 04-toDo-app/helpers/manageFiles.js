const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../db/data.json');

const saveDB = (data) => {
	try {
		fs.writeFileSync(file, JSON.stringify(data));
	} catch (err) {
		console.log(err);
	}
};

const readDB = () => {
	if (!fs.existsSync(file)) {
		return null;
	}

	const info = fs.readFileSync(file, 'utf8');

	return JSON.parse(info);
};

module.exports = {
	saveDB,
	readDB,
};
