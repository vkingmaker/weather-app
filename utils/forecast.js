const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/0eee3d1a4dc06c1a19126d9b9bf573c2/${latitude},${longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const { temperature } = body.currently;
      const { precipProbability } = body.currently;
      const { summary } = body.daily.data[0];
      callback(undefined, `${summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of rain .`);
    }
  });
};

module.exports = forecast;
