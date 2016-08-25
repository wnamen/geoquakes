// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;
var coords = [];
var latcoord;
var loncoord;
var marker;


	function initMap() {
		var mapDiv = document.getElementById('map');
	    map = new google.maps.Map(mapDiv, {
	      center: {lat: 37.78, lng: -122.44},
	      zoom: 8
	    });
	}

$(document).on("ready", function() {

	$.ajax({
		method: "GET",
		url: weekly_quakes_endpoint,
		dataType: "json",
		success: onSuccess
	});

	function onSuccess(json){
		var data = json.features;

		for (var i = 0; i < data.length; i++) {
			var loncoord = data[i].geometry.coordinates[0];
			var latcoord = data[i].geometry.coordinates[1];

			coords = {lat: latcoord, lng: loncoord};

			marker = new google.maps.Marker({
			position: coords,
			map: map,
			title: "Earthquake"
			});

			}
	
			console.log(coords);

		var source=$('#earthquake-template').html();
		 

		//compile:
		var template=Handlebars.compile(source);
		console.log(template);

		var earthquakeHtml = template({features: data});
		console.log(earthquakeHtml);
		
		$("#info").append(earthquakeHtml);
	}




});
