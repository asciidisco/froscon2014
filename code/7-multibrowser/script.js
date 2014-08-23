var phantomjs = new Browser({name: 'phantomjs', port: 7020, addr: 'localhost'});
var chrome = new Browser({name: 'chrome', port: 9515, addr: 'localhost'});
var firefox = new Browser({name: 'firefox', port: 8000, addr: 'localhost'});
//var ie = new Browser({name: 'InternetExplorer', port: 5555, addr: 'localhost'});

var url = 'http://amazon.com';
var windowSize = {width: 600, height: 800};

phantomjs.getSession(function (err, session) {
  phantomjs.setSession(session.sessionId);
  phantomjs.open(url, function (err) {
    phantomjs.getTitle(function (err, title) {
      document.getElementById('phantom-title').innerHTML = title.value;
      phantomjs.resize(windowSize, function () {
        phantomjs.getScreenshot(function (err, screenshot) {
          var img = document.getElementById('phantom-shot');
          img.src = 'data:image/png;base64,' + screenshot.value;
          phantomjs.closeSession();
        });
      });
    });
  });
});

chrome.getSession(function (err, session) {
  chrome.setSession(session.sessionId);
  chrome.open(url, function (err) {
    chrome.getTitle(function (err, title) {
      document.getElementById('chrome-title').innerHTML = title.value;
      chrome.resize(windowSize, function () {
        chrome.getScreenshot(function (err, screenshot) {
          var img = document.getElementById('chrome-shot');
          img.src = 'data:image/png;base64,' + screenshot.value;
          img.style.width = windowSize.width + 'px';
          img.style.height = windowSize.height + 'px';
          chrome.closeSession();
        });
      });
    });
  });
});

firefox.getSession(function (err, session) {
  firefox.setSession(session.sessionId);
  firefox.open(url, function (err) {
    firefox.getTitle(function (err, title) {
      document.getElementById('firefox-title').innerHTML = title.value;
      firefox.resize(windowSize, function () {
        firefox.getScreenshot(function (err, screenshot) {
          var img = document.getElementById('firefox-shot');
          img.src = 'data:image/png;base64,' + screenshot.value;
          firefox.closeSession();
        });
      });
    });
  });
});