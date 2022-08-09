/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  const promise = new Promise(function(resolve, reject) {

    fs.readFile(filePath, (err, data) => {
      if (!err) {
        var completeData = data.toString().split(/\r?\n/);
        resolve(completeData[0]);
      } else {
        reject(err);
      }
    })
    // promise.then(resolve(data)).catch(err)

  });
  return promise;
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  const promise = new Promise(function(resolve, reject) {
    request('get', url, (err, resp) => {
      if (!err) {
        resolve(resp.statusCode);
      } else {
        reject(err);
      }
    })
  })
  return promise;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
