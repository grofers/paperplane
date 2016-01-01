$(document).ready(function () {
  /* Initialize Foundation */
  $(document).foundation();

  /* Initialize the message editor */
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/chrome");
  editor.setShowPrintMargin(false);
  editor.setOptions({
    maxLines: 20,
    minLines: 15
  });
  editor.getSession().setMode("ace/mode/jsoniq");

  var $inputAPIKey = $('#input-api-key'),
      $inputRegID = $('#input-reg-id');

  /* Load saved API keys, Registration IDs and messages */
  var $wrapperSavedAPIKeys = $('#menu-saved-api-keys'),
      $wrapperSavedRegIDs = $('#menu-saved-reg-ids'),
      $wrapperSavedMessages = $('#menu-saved-messages');

  var $countSavedAPIKeys = $wrapperSavedAPIKeys.children('.title').children('.count'),
      $countSavedRegIDs = $wrapperSavedRegIDs.children('.title').children('.count'),
      $countSavedMessages = $wrapperSavedMessages.children('.title').children('.count');

  var $menuSavedAPIKeys = $wrapperSavedAPIKeys.children('.nested.menu'),
      $menuSavedRegIDs = $wrapperSavedRegIDs.children('.nested.menu'),
      $menuSavedMessages = $wrapperSavedMessages.children('.nested.menu');


  // mock localforage object
  localforage = {
    getItem: function (key, cb) {
      if (key === 'api-keys') {
        cb(null, [
          {
            'name': 'Consumer App',
            'value': 'abcd'
          },
          {
            'name': 'Deliverer App',
            'value': 'xyz'
          },
          {
            'name': 'Shopper App',
            'value': '123'
          }
        ]);
      } else if (key === 'reg-ids') {
        cb(null, [
          {
            'name': 'Vishesh',
            'value': '2334322r'
          },
          {
            'name': 'Chitharanjan',
            'value': '34324242331f'
          }
        ]);
      } else if (key === 'messages') {
        cb(null, null);
      }
    }
  };

  localforage.getItem('api-keys', function (err, value) {
    if (err) {
      /* Apologize and set the count of saved API keys to 0. */
      $countSavedAPIKeys.text('0');
    } else if (!value) {
      /* No saved API keys yet. */
      $countSavedAPIKeys.text('0');
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      $countSavedAPIKeys.text(value.length);
      value.forEach(function (obj) {
        $menuSavedAPIKeys.append(
          '<li>' +
            '<div class="saved" data-value="' + obj.value + '">' +
              '<div class="name"><a href="#">' + obj.name + '</a></div>' +
              '<div class="btn-delete"><a href="#"><i class="fa fa-trash"></i></a></div>' +
            '</div>' +
          '</li>'
        );
      });
      $menuSavedAPIKeys.children().each(function (idx, child) {
        var $childLink = $(child).find('a.saved');
        $childLink.click(function () {
          $inputAPIKey.val($childLink.data('value'));
        });
      });
    } else {

    }
  });

  localforage.getItem('reg-ids', function (err, value) {
    if (err) {
      /* Apologize and set the count of saved registration IDs to 0 */
      $countSavedRegIDs.text('0');
    } else if (!value) {
      /* No saved registration IDs yet. */
      $countSavedRegIDs.text('0');
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      $countSavedRegIDs.text(value.length);
      value.forEach(function (obj) {
        $menuSavedRegIDs.append(
          '<li>' +
            '<div class="saved" data-value="' + obj.value + '">' +
              '<div class="name"><a href="#">' + obj.name + '</a></div>' +
              '<div class="btn-delete"><a href="#"><i class="fa fa-trash"></i></a></div>' +
            '</div>' +
          '</li>'
        );
      });
      $menuSavedRegIDs.children().each(function (idx, child) {
        var $childLink = $(child).find('a.saved');
        $childLink.click(function () {
          $inputRegID.val($childLink.data('value'));
        });
      });
    } else {

    }
  });

  localforage.getItem('messages', function (err, value) {
    if (err) {
      /* Apologize and set the count of saved messages to 0 */
      $countSavedMessages.text('0');
    } else if (!value) {
      /* No saved messages yet. */
      $countSavedMessages.text('0');
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      $countSavedMessages.text(value.length);
      value.forEach(function (obj) {
        $menuSavedMessages.append(
          '<li>' +
            '<div class="saved" data-value="' + obj.value + '">' +
              '<div class="name"><a href="#">' + obj.name + '</a></div>' +
              '<div class="btn-delete"><a href="#"><i class="fa fa-trash"></i></a></div>' +
            '</div>' +
          '</li>'
        );
      });
      $menuSavedMessages.children().each(function (idx, child) {
        var $childLink = $(child).find('a.saved');
        $childLink.click(function () {
          window.alert($childLink.data('value'));
        });
      });
    } else {

    }
  });

});
