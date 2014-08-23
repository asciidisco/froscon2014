var openUrl = function (url, session, cb) {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:7020/session/' + session + '/url', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
      cb(null, JSON.parse(request.responseText));
    };

    request.onerror = function() {
      cb(arguments, null);
    };

  request.send(JSON.stringify({url: url}));
};

var getSession = function (cb) {
  var request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:7020/session', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onload = function() {
    cb(null, JSON.parse(request.responseText));
  };

  request.onerror = function() {
    cb(arguments, null);
  };

  request.send(JSON.stringify({
    desiredCapabilities: {
      browserName: 'phantomjs', 
      version: '', 
      platform: 'ANY'
    }
  }));
};

getSession(function (err, data) {
  openUrl('http://localhost:5000', data.sessionId, function (err, url) {
    var success = err ? 'Nope.' : 'Yep.';
    var el = document.createElement('div');
    var contents = document.createTextNode('Success: ' + success);
    el.appendChild(contents);
    document.getElementsByTagName('body')[0].appendChild(el);    
  });
});