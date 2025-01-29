// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [basemap]
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
let tectonic_plates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

let baseMaps = {
  "Basemap": basemap,
  "Street": street
};

let overlays = {
  "Tectonic Plates": tectonic_plates,
  "Earthquakes": earthquakes
};

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Create a legend control object.
let legend = L.control({ position: "bottomright" });


// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map


// Create the map object with center and zoom options.


// Then add the 'basemap' tile layer to the map.

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      stroke: true,
      weight: 0.5,
      radius: calculateRadius(feature.properties.mag)
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function calculateRadius(magnitude) {
    if (!magnitude) {
      return 1;
    }
    return magnitude * 4;
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag + "</h3><hr><p>Location: " + feature.properties.place + "</p>");
    }
  }).addTo(map);

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
      // Define the style information for the tectonic plates layer
      function plateStyle(feature) {
        return {
          color: "#ff6500",
          weight: 2
        };
      };
  
      // Loop through our depth intervals to generate a label with a colored square for each interval.
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          (depths[i] + 1 ? depths[i] + "&ndash;" + depths[i + 1] + "<br>" : "+" + depths[i]);
      }
  
      return div;
    };
  
    // Finally, add the legend to the map.
    legend.addTo(map);


    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    L.geoJson(plate_data, {
      style: plateStyle
    }).addTo(tectonic_plates);

    // Then add the tectonic_plates layer to the map.
    tectonic_plates.addTo(map);
  });
});

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/Starter_Code",
      "file": "${workspaceFolder}/Starter_Code/index.html"
    }
  ]
}
