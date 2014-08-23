var closeSession = function (session) {
  var request = new XMLHttpRequest();
  request.open('DELETE', 'http://localhost:7020/session/' + session, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();           
};

var getPageTitle = function (session, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:7020/session/' + session + '/title', true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.onload = function() {
    cb(null, JSON.parse(request.responseText));
  };

  request.onerror = function() {
    cb(arguments, null);
  };

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
  openUrl('http://localhost:5000', data.sessionId, function (err) {
    getPageTitle(data.sessionId, function (err, title) {
      var el = document.createElement('div');
      var contents = document.createTextNode(JSON.stringify(title));
      el.appendChild(contents);
      document.getElementsByTagName('body')[0].appendChild(el);
      closeSession(data.sessionId);
    });  
  });
});