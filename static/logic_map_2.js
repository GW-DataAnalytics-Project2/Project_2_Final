
// var mapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//   "T6YbdDixkOBWH_k9GbS8JQ";

var myMap = L.map("map", {
    center: [38.9072, -77.0369],
    zoom: 12
    ,
    });

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +"access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." + "T6YbdDixkOBWH_k9GbS8JQ")
.addTo(myMap);

var geojson_link = "http://data.insideairbnb.com/united-states/dc/washington-dc/2017-05-10/visualisations/neighbourhoods.geojson"

var geojson;

d3.json(geojson_link, function(data){
    d3.csv('static/sentiment_analysis.csv', function(err, score) {
      console.log(score.length)
        for (var i=0; i < score.length; i++){
            //return score
            // data.features[i].properties.neighbourhood
            // score[i].neighbourhood_cleansed
            // score[i].sentiment_score

            for (var j = 0; j < data.features.length; j++) {
                if (data.features[i].properties.neighbourhood == score[j].neighbourhood_cleansed) {
                    data.features[i].properties.sentiment_score = +score[j].sentiment_score;
                }
            }
        }

        L.choropleth(data, {
            valueProperty:"sentiment_score",
            // Color scale
            scale: ["#ffeda0", "#f03b20"],
            // Number of breaks in step range
            steps: 10,
            // q for quantile, e for equidistant, k for k-means
            mode: "q",
            style: {
            // Border color
            color: "#fff",
            weight: 2,
            opacity: 1,
            dashArray:'3',
            fillOpacity: 0.8
            },
            // Binding a pop-up to each layer
            onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.neighbourhood + "<hr/>"+ "Sentiment Score:" + feature.properties.sentiment_score.toFixed(2));
        }
    }

        ).addTo(myMap);
    })
})




        // if (err) throw err;
        // var sent_dict={}
        // score.forEach(function(d) {
        //     return d.neighbourhood_cleansed
        //     //d.sentiment_score = +d.sentiment_score;
           //sent_dict[neighbourhood_name] = d.neighbourhood_cleansed
           //sent_dict[neighbourhood_score] = d.sentiment_score




    //createFeatures(data.features);


// function createFeatures(neighbourhood_data){
//     // function onEachFeature(feature, layer) {

//     var neighbourhoods = L.geoJSON(neighbourhood_data, {
//         // onEachFeature: onEachFeature
//     });
//     //createMap(neighbourhoods)
//}

// function createMap(neighbourhoods) {
//     var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//     "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//     "T6YbdDixkOBWH_k9GbS8JQ");

//     var overlayMaps = {
//         "Neighbourhoods": neighbourhoods
//       };




// }
