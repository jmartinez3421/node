const axios = require("axios");

class Searches {
    history = ['Barcelona', 'Madrid', 'Sevilla'];

    constructor() {
        //Read DB if exists
    }

    get paramsMapbox(){
        return {
            'access_token': 'pk.eyJ1Ijoiam1hcnRpbmV6ZzM0MjEiLCJhIjoiY2t4eW53bGFkMmh2eDJzbXBsY3FvbjVvMiJ9.-KxdjQJLHJ5ATPUltlLNJQ',
            'limit': 5,
            'language': 'en',
            'proximity':'ip',
            'types':'place'
        }
    }

    async city(place = '') {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();
            console.log(resp.data);

            return [];
        } catch (err) {
            return [];
        }
    }
}

module.exports = Searches;