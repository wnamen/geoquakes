// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var data;
var map;
var coords = [];
var latcoord;
var loncoord;
var marker;
var markers = [];
var icons = {
	quake: {
		icon: "earthquake.png"
	}
}


function initMap() {
	var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
      center: {lat: 37.78, lng: -122.44},
      zoom: 2,
			styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: -80 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 }
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
          ]
    });
}

$(document).on("ready", function(event) {

	$.ajax({
		method: "GET",
		url: weekly_quakes_endpoint,
		dataType: "json",
		success: onSuccess
	});

	function onSuccess(json){
		data = json.features;

		genMarker();

		var source=$('#earthquake-template').html();
		var template=Handlebars.compile(source);
		var earthquakeHtml = template({features: data});
		$("#info").append(earthquakeHtml);
	}

	function genMarker() {
		for (var i = 0; i < data.length; i++) {
			var loncoord = data[i].geometry.coordinates[0];
			var latcoord = data[i].geometry.coordinates[1];

			coords = {lat: latcoord, lng: loncoord};

			marker = new google.maps.Marker({
				position: coords,
				map: map,
				title: "Earthquake",
				icon: icons.quake.icon
			});

			markers.push(marker);

		}
	}

	// marker.addListener('click', function() {
  //  	map.panTo(marker.getPosition());
	// 	console.log("clicked");
	// });


});
