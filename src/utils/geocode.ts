import request from 'request';

export const geocode = (
  address: string,
  callback: (
    err?: string,
    result?: { longitude: string; latitude: string; location: string }
  ) => void
) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmtpbmdtYWtlciIsImEiOiJjanlzaThlZjMwa2UzM2RudXl0N2cwZXZkIn0.FrQLw4Uu_Hn94ZinHt3fhQ&limit=1`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      console.log(err);
      callback('Unable to connect to location services!', undefined);
    } else if (res.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        longitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name
      });
    }
  });
};
