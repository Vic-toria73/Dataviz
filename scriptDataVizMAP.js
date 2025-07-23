// On déclare les coordonnées de ADA 
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


let marker = L.marker([lat, lon]).addTo(map);

//on charge l'icone du marqueur
/*let icone = L.icon({
    iconUrl: "/leaflet/images/fly.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    //popupAnchor: [0, -41]
});

let marker = L.marker([lat, lon], {
    icon: icone
}).addTo(map);

let popup = `<div class="popup>
<h2></h2>
<p></p>
</div>`;//rajouter les contenus des datas obtenu avec l'api opensky & cie

marker.binPopup(popup);*/