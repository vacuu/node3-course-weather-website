const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hyaXMxMjdiZWF0cmVlIiwiYSI6ImNrOHl2MDJ3bDFicGUzcHM3eGEwdGxxbTgifQ.8Z1kZ9Cp3Z20z4o8laPkUg&limit=1'

  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to forward geocoding.', undefined);
    } else if (body.message || body.features.length === 0) {
      callback('Not found. Try again with another input.', undefined);
    } else {
      const location = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      }
      // console.log(location);
      callback(undefined, location)
    }
  })
}

module.exports = geocode
