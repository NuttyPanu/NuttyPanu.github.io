const options = {
    // Required: API key
    key: '75njjHs2UsIHeAqTmHlezU1laqIRxzO1', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 13.875783309643454,
    lon: 100.58418493770829,
    zoom: 9,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([13.875783309643454, 100.58418493770829])
        .setContent('PWA')
        .openOn(map);
});
