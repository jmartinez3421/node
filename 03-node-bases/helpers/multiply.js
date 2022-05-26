const fs = require('fs');
const path = require('path');

const createMultiplicationTable = async (base, list = false, limit=10) => {
	try {
		let output = `=====================================\n============ Table of ${base} =============\n=====================================`;
		let cons = '=====================================\n============ '.cyan + `Table of ${base}`.brightRed + ' =============\n====================================='.cyan;
		for (let i = 0; i <= limit; i++) {
			output += `\n${base} x ${i} = ${base * i}`;
			cons += `\n${base} ${'x'.cyan} ${i} ${'='.cyan} ${base * i}`;
		}

		if (list) {
			console.log(cons);
		}

		const fileName = `table-${base}.txt`;
		const filePath = path.join(__dirname, `../tables/${fileName}`);
		// fs.writeFile(filePath, output, (err) => {
		// 	err ? console.log(err) : console.log(`File table-${base}.txt created!!`);
		// });

		fs.writeFileSync(filePath, output);
		return fileName;
	} catch (err) {
		return err;
	}
};

module.exports = createMultiplicationTable;
