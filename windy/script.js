const options = {
    // Required: API key
    key: '75njjHs2UsIHeAqTmHlezU1laqIRxzO1', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 12.340001834116316,
    lon: 100.4150390625,
    zoom: 9,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([12.340001834116316, 100.4150390625])
        .setContent('PWA')
        .openOn(map);
});
