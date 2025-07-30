// On déclare les coordonnées pour créer la map sur un point existant
let lat = 45.74704;
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


async function searchCity() {
    let marker = L.marker([lat, lon], {
    })
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    // Appel à l'API de géocodage Nominatim
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
        const data = await response.json()
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                // Déplacement de la carte et ajout du marqueur
                map.setView([lat, lon], 12);

                if (marker) map.removeLayer(marker);

                marker = L.marker([lat, lon]).addTo(map)
            }
        };

export {searchCity, map}
