const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bc9adc7757f717b7733880708e60d7e&query=' + lat + ',' + lon + '&units=f'
    
    request({ url: url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        }    
        else {
            callback(undefined, 'Clear throughout the day. It is currently ' + response.body.current.temperature + 'degrees out. There is a ' + response.body.current.feelslike + '% chance of rain')
        }
    })
}

module.exports = forecast