const {readInput, listPlaces} = require("./inquirer");
const Searches = require('../models/searches');

const searches = new Searches();

const getSelectedCity = async (places) => {
    const id = await listPlaces(places);
    if (id === 0) return {selectedCity: undefined, weather: undefined};
    const selectedCity = places.find(p => p.id === id);
    const weather = await searches.weather(selectedCity.lat, selectedCity.lng);
    return {
        selectedCity,
        weather
    }
}

const printInformation = (city, weather) => {
    console.log('\nCity information'.green.underline);
    console.log('City: '.green, city.name);
    console.log('Lat: '.green, city.lat);
    console.log('Lng: '.green, city.lng);
    if (weather) {
        console.log('-----------------------------------'.green);
        console.log('Weather: '.green, weather.desc);
        console.log('Temperature: '.green, weather.temp + 'º');
        console.log('Min.: '.green, weather.min + 'º');
        console.log('Max.: '.green, weather.max + 'º');
        console.log('Humimdity: '.green, weather.humidity + '%');
    }else{
        console.log('No weather information'.grey);
    }
}

const selectCity = async () => {
    //Show message
    const place = await readInput('Search a city: ');

    //Search places
    const places = await searches.city(place);

    const {selectedCity, weather} = await getSelectedCity(places);

    if (selectedCity) {
        searches.addToHistory(selectedCity);
        printInformation(selectedCity, weather);
    }
}

const showHistory = async () => {
    const {selectedCity, weather} = await getSelectedCity(searches.history);
    if (selectedCity) printInformation(selectedCity, weather);
}

module.exports = {
    selectCity,
    showHistory
}
