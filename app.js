const request = require('request');

const url = 'https://api.darksky.net/forecast/0eee3d1a4dc06c1a19126d9b9bf573c2/37.8267,-122.4233' ;

request({url}, (error, res) => {
    const data = JSON.parse(res.body);
    console.log(data);   
});