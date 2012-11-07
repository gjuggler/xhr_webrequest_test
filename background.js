var nonBlockingFn = function(details) {
  console.log('  NON-blocking heard ' + details.url);
};
var blockingFn = function(details) {
  console.log('  BLOCKING heard ' + details.url);
};

chrome.webRequest.onBeforeRequest.addListener(blockingFn, {
  urls: ["<all_urls>"],
},
['blocking']);

chrome.webRequest.onBeforeRequest.addListener(nonBlockingFn, {
  urls: ["<all_urls>"],
});

var url = 'http://bit.ly/RaQwNx';
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.addEventListener("load", function(e) {
  chrome.webRequest.onBeforeRequest.removeListener(blockingFn);
  chrome.webRequest.onBeforeRequest.removeListener(nonBlockingFn);
  console.log("XHR SUCCESS");
},
false);
xhr.send();
