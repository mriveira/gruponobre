var myLatlng;
var map;
var marker;

function createGoogleMap(elementId, zoomSize, latitude, longitude, title, description) {
    $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBFM9di433fMlQhBZHrTT8VxzAsgw5Tgnc", function(){
        myLatlng = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            zoom: zoomSize,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            draggable: false
        };
        map = new google.maps.Map(document.getElementById(elementId), mapOptions);

        var contentString = '<p style="line-height: 20px;"><strong>' + title + '</strong></p><p>' + description + '</p>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Marker'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    });
}

//google.maps.event.addDomListener(window, 'load', initialize);