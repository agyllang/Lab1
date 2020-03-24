//install service worker
self.addEventListener("install", evt => {
  console.log("service worker has been installed");
});

//activate service worker
self.addEventListener("activate", evt => {
  console.log("service worker has been activated");
});

//fetch event
self.addEventListener("fetch", evt => {
  // do nothing here, just log all the network requests
  console.log("fetch event: ", evt); //evt.request.url
});
