if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function() {
    console.log("Service Worker Registered");
  });
}

function pan(x, y, k) {
  map.panBy(x * k, y * k);
}

function zoom(x) {
  map.setZoom(map.getZoom() + x);
}

function tiltMap(tilt) {
  map.setTilt(tilt);
}
//_____________MAP______________
var map;
var markerTC;
var markerKTH;

var kth_location = { lat: 59.3498092, lng: 18.0684758 };
var t_centralen = { lat: 59.32915362, lng: 18.058666432 };

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: t_centralen,
    zoom: 19,
    mapTypeId: "satellite", // (ROADMAP, SATELLITE, HYBRID, or TERRAIN)
    rotateControl: true,
    disableDefaultUI: true
  });
  markerKTH = new google.maps.Marker({
    map: map,
    title: "KTH draggable",
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: kth_location
  });

  markerTC = new google.maps.Marker({
    map: map,
    title: "T-centralen not draggable",
    draggable: false,
    animation: google.maps.Animation.BOUNCE,
    position: t_centralen
  });
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen;

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

self.addEventListener("install", function(event) {
  var CACHE_NAME = "my-site-cache-v1";
  var urlsToCache = ["/", "/index.css", "/index.js"];

  self.addEventListener("install", function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
    );
  });
});

var deferredPrompt;

window.addEventListener("beforeinstallprompt", function(e) {
  console.log("platforms", e.platforms);
  e.preventDefault();
  deferredPrompt = e;
  showAddToHomeScreen();
});

function showAddToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt");
  a2hsBtn.style.display = "block";
  a2hsBtn.addEventListener("click", addToHomeScreen);
}

function addToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt");

  // hide our user interface that shows our A2HS button
  a2hsBtn.style.display = "none";

  // Show the prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(function(choiceResult) {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }
    deferredPrompt = null;
  });
}
