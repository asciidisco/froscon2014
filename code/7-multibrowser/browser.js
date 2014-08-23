var Browser = function (options) {
  this.options = options;
};

Browser.prototype.getSession = function (cb) {
  var args = {
    desiredCapabilities: {
      browserName: this.options.name, 
      version: '', 
      platform: 'ANY'
    }
  };
  
  this._send('POST', '/session', cb, args);
};

Browser.prototype.closeSession = function () {
  this._send('DELETE', '/session/:sessionId', function () {});
};

Browser.prototype.open = function (url, cb) {
  this._send('POST', '/session/:sessionId/url', cb, {url: url});
};

Browser.prototype.getTitle = function (cb) {
  this._send('GET', '/session/:sessionId/title', cb);
};

Browser.prototype.getScreenshot = function (cb) {
  this._send('GET', '/session/:sessionId/screenshot', cb);  
};

Browser.prototype.resize = function (size, cb) {
  this._send('POST', '/session/:sessionId/window/current/size', cb, size);  
};

Browser.prototype.setSession = function (session) {
  this._session = session; 
};

Browser.prototype._send = function (method, command, cb, options) {
  var request = new XMLHttpRequest();
  var url = 'http://' + this.options.addr + ':' + this.options.port + command; 
  request.open(method, url.replace(':sessionId', this._session), true);
  request.setRequestHeader('Content-Type', 'application/json');
  
  request.onload = function() {
    cb(null, JSON.parse(request.responseText));
  };

  request.onerror = function() {
    cb(arguments, null);
  };

  request.send((options ? JSON.stringify(options) : ''));   
};