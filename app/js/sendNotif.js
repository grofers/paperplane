'use strict';
var gcm = require('node-gcm');

var send = function (sender, gcmNotification, registrationIDs) {
  return new Promise(function(resolve, reject) {
    return sender.send(gcmNotification,  {registrationIds: registrationIDs}, function(err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

var sendNotification = function () {
  var registrationIDs = window.document.getElementById('registration-id').value,
    authKey = window.document.getElementById('auth-key').value,
    message = editor.getValue();
  localStorage.registrationIDs = registrationIDs;
  localStorage.authKey = authKey;
  localStorage.notification = message;
  try {
    message = JSON.parse(message);
  } catch (e) {
    return alert("Not a valid JSON.");
  }
  registrationIDs = registrationIDs.trim().split(/\s*,\s*/);
  var start = 0,
    batchSize = 1000,
    remaining = registrationIDs.length,
    registrationIDBatches = [];
  while (remaining > 0) {
    var batchSize = Math.min(batchSize, remaining);
    registrationIDBatches.push(registrationIDs.slice(start, start + batchSize));
    start += batchSize;
    remaining -= batchSize;
  }
  var gcmNotification = new gcm.Message({data: message}),
    sender = new gcm.Sender(authKey);
  var requestArray = registrationIDBatches.map(function(registrationIDBatch) {
    return send(sender, gcmNotification, registrationIDBatch);
  });
  return Promise.all(requestArray)
    .then(function(results) {
      var results = results.reduce(function(a, b) {
        return {
          success: a.success + b.success,
          failure: a.failure + b.failure
        }
      });
      console.log(results);
      alert("success : " + results.success + "\nfailure : " + results.failure);
    });
};
