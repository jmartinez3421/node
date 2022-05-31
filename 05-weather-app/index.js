require('colors');

const { readInput } = require('./helpers/inquirer');

const main = async () => {

    const text = await readInput('Hello: '.red);

    console.log(text);

};

main();