const request = require('request')

const weather = (latitude, longitude, callback) => {
    const options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        qs: {
          //q: 'London,uk',
          lat: latitude,
          lon: longitude,
          //callback: 'jsonp',
          //id: '2172797',
          lang: 'null',
          units: 'imperial',
          mode: 'xml,html'
        },
        json: true,
        headers: {
          'x-rapidapi-key': '76bae988camshe889b77773b0a31p1198d8jsnd0419e353a2c',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          useQueryString: true
        },
      };

    request(options, (error, {body}) => {
        if (error) {
            callback('Unable to fetch current weather status. Please check your network connectivity', undefined)
        }else if (body.message === 'invalid input') {
            callback('Unable to get weather on that location', undefined)
        }else if(body.message === 'internal server error'){
            callback(undefined, 'Please try again some other time')
        }
        else{
            callback(undefined, 'Current Weather Description: ' + body.weather[0].description +'. Temperature of '+ body.main.temp + ' degrees with wind speeds of ' + body.wind.speed + ' mph.')
        }
    })
}

module.exports = weather