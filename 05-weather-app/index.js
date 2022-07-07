require('colors');
require('dotenv').config();

const {inquirerMenu, inquirerPause} = require('./helpers/inquirer');
const {selectCity, showHistory} = require("./helpers/actions");

const main = async () => {
    let opt;
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                await selectCity();
                break;
            case 2:
                await showHistory();
                break;
            default:
                console.log('Select a valid option'.red);
        }
        if (opt !== 0) await inquirerPause();
    } while (opt !== 0);
};

main();
