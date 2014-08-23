// Query the status method
request = new XMLHttpRequest();
request.open('GET', 'http://localhost:7020/status', true);

request.onload = function() {
  // Put the received data into the dom
  var el = document.createElement('div');
  var contents = document.createTextNode(request.responseText);
  el.appendChild(contents);
  document.getElementsByTagName('body')[0].appendChild(el);
};

request.onerror = function() {
  // There was a connection error of some sort
  console.error('err:', arguments);
};

// Fire the request
request.send();