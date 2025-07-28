// On déclare les coordonnées pour créer la map sur un point existant
let lat = 45.74707;
let lon = 4.84591;

// On initialise la carte (en lui passant 'map' qui est l'ID de la DIV contenant la carte)
let map = L.map("map", {
    zoom: 13,
    center: [lat, lon]
});

// On ajoute le calque permettant d'afficher les images de la carte
L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
}).addTo(map);

//on charge l'icone du marqueur
let icone = L.icon({
    iconUrl: "/leaflet/images/plane.png",
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
    popupAnchor: [0, -12.5],
    rotationAngle: 0
});

let marker = L.marker([lat, lon], {
   icon: icone
})
