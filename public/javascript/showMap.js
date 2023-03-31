// const campground = require("../../models/campground");

// const campground = require("../../models/campground");

   // mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uZ2thcCIsImEiOiJjbGZzYnZrcG4wNHFxM3BvYmFucDBpdzZvIn0.rLcgY7-OjYb7wY81phLCfg';
   mapboxgl.accessToken = mapToken;
   const map = new mapboxgl.Map({
     container: 'map', // container ID
     style: 'mapbox://styles/mapbox/streets-v12', // style URL
    //  center: [93.62, 27.09], // starting position [lng, lat]
    center:campground.geometry.coordinates,
     zoom: 15, // starting zoom
   });
   new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map)