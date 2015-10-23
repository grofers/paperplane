console.log('Hello, world!');
var fs = require('fs');
fs.realpath(__dirname, function (err, path) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Path is : ' + path);
});
fs.readdir(__dirname, function (err, files) {
  if (err) return;
  files.forEach(function(f) {
    console.log('Files : ' + f);
  });
});
