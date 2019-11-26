const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/f2609d5044a30083f05d0c472b431b47/${lat},${long}?units=si`
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather api..')
        } else if (response.body.error)
            callback('either The given location is invalid or Poorly formatted request.')
        else
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    })
}
module.exports = forecast