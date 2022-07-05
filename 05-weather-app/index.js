require('colors');
const Searches = require('./models/searches');

const {inquirerMenu, inquirerPause, readInput} = require('./helpers/inquirer');

const main = async () => {

    const searches = new Searches();
    let opt;
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Show message
                const place = await readInput('Search a city: ');
                await searches.city( place );
                //Search places

                //Select a place

                //Weather

                //Show results
                console.log('\nCity information\n'.green);
                console.log('City: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
                console.log('Temperature: ',);
                console.log('Min.: ',);
                console.log('Max.: ',);
                break;
        }

        if (opt !== 0) await inquirerPause();
    } while (opt !== 0);

};

main();