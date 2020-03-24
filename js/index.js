function setMap(type) {
  map.setMapTypeId(type);
}

function pan(x, y, k) {
  map.panBy(x * k, y * k);
}

function zoom(x) {
  map.setZoom(map.getZoom() + x);
}

function tiltMap() {
  // map.setTilt(tilt);
  if (map.getTilt() == 0) {
    map.setTilt(90);
  } else {
    map.setTilt(0);
  }
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
    mapTypeId: "hybrid", // (ROADMAP, SATELLITE, HYBRID, or TERRAIN)
    rotateControl: false,
    fullscreenControl: false,

    disableDefaultUI: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      }
    ]
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
