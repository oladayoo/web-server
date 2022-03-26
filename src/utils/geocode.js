const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoib2xhZGF5bzEiLCJhIjoiY2wwcTFtZ3cwMDJtOTNkc2QxbGVybmRrYSJ9.eyt87QGqEHIBgDHuA0P68Q'

    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[0],
                lon: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode