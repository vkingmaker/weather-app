const request = require('request');

const url = 'https://api.darksky.net/forecast/0eee3d1a4dc06c1a19126d9b9bf573c2/37.8267,-122.4233' ;

request({url, json:true}, (error, res) => {
    const {temperature} = res.body.currently;
    const {precipProbability} = res.body.currently;

    console.log(temperature);   
    console.log(precipProbability);   

    console.log(`It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain.`)
});