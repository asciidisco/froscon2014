var getScreenshot = function (session, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:7020/session/' + session + '/screenshot', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onload = function() {
    cb(null, JSON.parse(request.responseText));
  };

  request.onerror = function() {
    cb(arguments, null);
  };

  request.send();
};

var closeSession = function (session) {
  var request = new XMLHttpRequest();
  request.open('DELETE', 'http://localhost:7020/session/' + session, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();           
};

var openUrl = function (url, session, cb) {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:7020/session/' + session + '/url', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
      cb(null);
    };

    request.onerror = function() {
      cb(arguments);
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
  openUrl('http://amazon.com', data.sessionId, function (err) {
    getScreenshot(data.sessionId, function (err, screenshot) {
      var img = document.createElement('img');
      img.src = 'data:image/png;base64,' + screenshot.value;
      document.getElementsByTagName('body')[0].appendChild(img);
      closeSession(data.sessionId);
    });  
  });
});