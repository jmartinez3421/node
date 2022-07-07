const axios = require("axios");
const fs = require('fs');

class Searches {
    history = [];
    dbPath= 'db/database.json';

    constructor() {
        this.readDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en',
            'proximity':'ip',
            'types':'place'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
    }

    async city(place = '') {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }) );
        } catch (err) {
            return [];
        }
    }

    async weather(lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
                humidity: main.humidity
            }
        } catch (error) {
            console.log(error);
        }
    }

    addToHistory( place ) {
        if( this.history.find(p => p.id === place.id) ){
            return;
        }
        this.history.unshift( place.toLocaleLowerCase() );
        this.history = this.history.splice(0,5);
        this.saveDB();
    }

    saveDB() {
        fs.writeFileSync( this.dbPath, JSON.stringify( this.history ) );
    }

    readDB() {
        if( !fs.existsSync( this.dbPath ) ) return;

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        this.history = JSON.parse(info);
    }
}

module.exports = Searches;
