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
  var el = document.createElement('div');
  var contents = document.createTextNode(JSON.stringify(data));
  el.appendChild(contents);
  document.getElementsByTagName('body')[0].appendChild(el);
});

