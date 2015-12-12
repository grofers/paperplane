'use strict';
var gcm = require('node-gcm');

var sendNotification = function () {
        var registrationID = this.window.document.getElementById('registration-id').value,
            authKey = this.window.document.getElementById('auth-key').value,
            message = editor.getValue();
        try {
            message = JSON.parse(message);
        } catch (e) {
            return alert("Not a valid JSON.");
        }
        var gcmNotification = new gcm.Message({data: message}),
            sender = new gcm.Sender(authKey);
        sender.send(gcmNotification, {registrationIds: [registrationID]}, function (err, result) {
            if (err) {
                console.log(err);
                alert(err);
            } else {
                console.log(result);
                alert("success : " + result.success + "\nfailure : " + result.failure);
            }
        });
    };
