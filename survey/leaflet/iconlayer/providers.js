(function(factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else {
        window.providers = factory(window.L);
    }
})(function(L) {
    var providers = {};
    /*
    providers['OpenStreetMap_Mapnik'] = {
        title: 'osm',
        icon: 'icons/openstreetmap_mapnik.png',
        layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    };

    providers['Stamen_Toner'] = {
        title: 'toner',
        icon: 'icons/stamen_toner.png',
        layer: L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        })
    };


    providers['Esri_OceanBasemap'] = {
        title: 'esri ocean',
        icon: 'icons/esri_oceanbasemap.png',
        layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
            maxZoom: 13
        })
    };

    */

    /*
    providers['openstreetmap'] = {
        title: 'OSM',
        icon: 'icons/openstreetmap_mapnik.png',
            layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19.25,
            maxNativeZoom:19.25,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    };
    */

    /*
    providers['CartoDB_Positron'] = {
        title: 'positron',
        icon: 'icons/cartodb_positron.png',
        layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 19
        })
    };
    

    providers['cartoLight'] = {
        title: 'cartoLight',
        icon: 'icons/openstreetmap_blackandwhite.png',
            layer: L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            subdomains: 'abcd',
            maxZoom: 30,
            maxNativeZoom:30,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
        })
    };
    */

 


    providers['googleRoad'] = {
        title: 'ถนน',
        icon: 'icons/here_normaldaygrey.png',
        layer: L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            attribution: 'Tiles &copy; Google Maps &mdash; Source: Road',
            subdomains: ['mt0','mt1','mt2','mt3'],
            maxZoom: 22.25,
            maxNativeZoom:22.25
        })
    };
    
    providers['googleHybrid'] = {
        title: 'ดาวเทียม+ชื่อ',
        icon: 'icons/here_satelliteday.png',
        layer: L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: 'Tiles &copy; Google Maps &mdash; Source: Hybrid',
            subdomains: ['mt0','mt1','mt2','mt3'],
            maxZoom: 21.25,
            maxNativeZoom:21.25
        })
    };
    providers['googleTraffic'] = {
        title: 'การจราจร',
        icon: 'icons/here_normaldaygrey.png',
        layer: L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
            attribution: 'Tiles &copy; Google Maps &mdash; Source: Traffic',
            subdomains: ['mt0','mt1','mt2','mt3'],
            maxZoom: 22.25,
            maxNativeZoom:22.25
        })
    };
    providers['googleTerrain'] = {
        title: 'ภูมิประเทศ',
        icon: 'icons/esri_worldterrain.png',
        layer: L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
            attribution: 'Tiles &copy; Google Maps &mdash; Source: Terrain',
            subdomains: ['mt0','mt1','mt2','mt3'],
            maxZoom: 22.25,
            maxNativeZoom:22.25
        })
    };



    providers['googleSat'] = {
        title: 'ดาวเทียม',
        icon: 'icons/here_satelliteday.png',
        layer: L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            attribution: 'Tiles &copy; Google Maps &mdash; Source: Satellite',
            subdomains: ['mt0','mt1','mt2','mt3'],
            maxZoom: 21.25,
            maxNativeZoom:21.25
        })
    };





    return providers;
});