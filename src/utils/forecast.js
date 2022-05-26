const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3bba2d08bd60b6daa4b345980838fc2e&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connnect weather service", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location. Please try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        forecast:
          body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.humidity +
          " % out." +
          " There is a " +
          body.current.feelslike +
          "% distance.",
      });
    }
  });
};

module.exports = forecast;
