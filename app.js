const request = require('request');

const url = 'https://api.darksky.net/forecast/0eee3d1a4dc06c1a19126d9b9bf573c2/37.8267,-122.4233';

request({ url, json: true }, (err, res) => {
  if (err) {
    console.log('Unable to connect to the internet');
  } else if (res.body.error) {
    console.log('Unable to find location. Try another search.');
  } else {
    const { temperature } = res.body.currently;
    const { precipProbability } = res.body.currently;
    const { summary } = res.body.daily.data[0];
    console.log(`${summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain .`);
  }
});


// const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmtpbmdtYWtlciIsImEiOiJjanlzaThlZjMwa2UzM2RudXl0N2cwZXZkIn0.FrQLw4Uu_Hn94ZinHt3fhQ&limit=1';

// request({ url: mapUrl, json: true }, (err, res) => {
//   if (err) {
//     console.log('Unable to connect to the internet');
//   } else if (res.body.features.length === 0) {
//     console.log('Unable to find location. Try another search.');
//   } else {
//     const [long, lat] = res.body.features[0].center;

//     console.log(`longitude = ${long}`);
//     console.log(`latitude = ${lat}`);
//   }
// });
