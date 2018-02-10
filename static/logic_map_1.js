d3.json("static/neighbourhoods.geojson", function(hood_data) {
  d3.csv('static/listings.csv',function(listing_data){
var lat_data = listing_data.map(function(d) { return d.latitude })
var lon_data = listing_data.map(function(d) { return d.longitude })
// console.log(lat_data[0])
// console.log(lon_data[0])
plotdata(hood_data.features,listing_data);
//plotdata(hood_data.features);
});

  });


  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.neighbourhood +
      "</h3>");
  }

function plotdata(hood_data,listing_data){
var hoods = L.geoJson(hood_data,{
  onEachFeature: onEachFeature
})
createMap(hoods,listing_data)
}

function getColor(d){
  return d > 3000  ? '#8B0000' : //dark red
         d > 1000  ? '#FF0000' : //red
         d > 500  ? '#FF4500' : //orange
         d > 250 ? '#FFD700' :  //yellow
                  '#008000' ;   //green
}




function createMap(hoods,listing_data) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  // console.log(plates)
  var overlayMaps = {
    Neighborhoods: hoods
  };
//   var sliderControl = L.control.sliderControl({position: "topright", layer: earthquakes});
//
// //Make sure to add the slider to the map ;-)
// map.addControl(sliderControl);
//
// //And initialize the slider
// sliderControl.startSlider();

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
    38.9072,-77.0369
    ],
    zoom: 11.5,
    layers: [streetmap, hoods]

  });
//   for (var i = 0; i < 7000; i++) {
//  marker = new L.marker([listing_data[i]['latitude'],listing_data[i]['longitude']])
//   .bindPopup('<b>$</b>'+listing_data[i]['price'])
//   .addTo(myMap);
// }
var myRenderer = L.canvas({ padding: 0.25 });
for (var i = 0; i < listing_data.length; i += 1) { // 100k points
  var latlng = [listing_data[i]['latitude'],listing_data[i]['longitude']]
	L.circleMarker(latlng, {
  	renderer: myRenderer,
    color: getColor(listing_data[i]['price'])
  }).addTo(myMap).bindPopup(listing_data[i]['name']+'<br>'+listing_data[i]['room_type']+'<br>'+'$'+listing_data[i]['price']);
}

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

      var div = L.DomUtil.create('map', 'info legend'),
          grades = [0,250, 500, 1000],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };


  legend.addTo(myMap);


}
