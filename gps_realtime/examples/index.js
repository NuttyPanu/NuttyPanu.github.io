//{"geometry": {"type": "Point", "coordinates": [-69.0553905407372, 28.80601349896117]}, "type": "Feature", "properties": {}}
var map = L.map('map'),
    realtime = L.realtime('https://wanderdrone.appspot.com/', {
        interval: 3 * 1000
    }).addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

realtime.on('update', function() {
    map.fitBounds(realtime.getBounds(), {maxZoom: 3});
});
