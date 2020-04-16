const request = require('request')
// first value is  lat 37 lon -122

const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=4a612f7938ab4286f6ab9806f7723a8b&query=' + latitude + ',' + longitude + '&units=f'
  //console.log('your url: ' + url);
  request({url, json: true},(error, {body} = {}) => {
    // without json:true it would be: const data = JSON.parse(response.body)
    if (error) {
      callback('Unable to connect to weather forcast.',undefined)
    }  else if (body.error) {
      callback('Invalid input.', undefined)
    }  else {
      const forecastinfoOne = body.current.weather_descriptions[0] + ' with ' + fToC(body.current.temperature) + '\xB0C.'
      const forecastinfoTwo = 'The current wind speed is ' + Math.round(body.current.wind_speed*1.6) + ' kmh.'
      callback(undefined, forecastinfoOne + forecastinfoTwo)
    }
  })
}

const fToC = (fahrenheit) => {
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  return Math.round(fToCel)
}

module.exports = forecast
//
