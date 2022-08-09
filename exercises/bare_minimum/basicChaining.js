/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var helper = require('./promiseConstructor.js');
var git = require('./promisification');

// var writeFileAsync = Promise.promisify(fs.writeFile);
Promise.promisifyAll(fs);
// Promisifies all 'fs' functions and gives us an `Async` suffixed version
// For example - `fs.readFileAsync`, `fs.writeFileAsync`


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return helper.pluckFirstLineFromFileAsync(readFilePath)
  .then(function(username){
    return git.getGitHubProfileAsync(username)
  })
  .then(function(jsonResponse){
    console.log('!!!!!!!!!!!!!!', jsonResponse)
    return fs.writeFileAsync(writeFilePath, JSON.stringify(jsonResponse))
  })

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
