import { airlines } from './airlines.js'
import { postData, getData, recupAPI } from './dom.js'


const inputToken = document.getElementById('input_token')
const btnToken = document.getElementById('btn_token')
const btnFree = document.getElementById('btn_free')

const divMap = document.getElementById('div_map')
const divAccueil = document.getElementById('div_accueil')


btnToken.addEventListener('click', async () => {
    let secretCode = inputToken.value
    const token = await postData(secretCode)
    const data = await getData(token)
    const planes = await donneeAvion(data)
    await planesCordinates(planes)
    inputToken.innerText = ''
    divMap.style.visibility = "visible"
    divAccueil.style.display = "none"
})


btnFree.addEventListener('click', async () => {
    const data = await recupAPI()
    console.log(data)
    const planes = await donneeAvion(data)
    const planesData = await SearchAirline(planes)
    console.log(planesData)
    await planesCordinates(planesData)
    divMap.style.visibility = "visible"
    divAccueil.style.display = "none"
})


async function donneeAvion(data) {
    let tableauDonneesAvion = []
    for (let k in data) {
        tableauDonneesAvion.push({
            'ICAO24': data[k][0],
            'reference': data[k][1],
            'Provenance': data[k][2],
            'longitude': data[k][5],
            'latitude': data[k][6]
        })
    }
    return (tableauDonnéesAvion)

    //const dataInfosVol = await APIinfosVol()
    //console.log(dataInfosVol)
}

main();

async function planesCordinates() {
    let tableauDonneesAvion = await main()
    console.log(tableauDonneesAvion)
    for (let i = 0; i < tableauDonneesAvion.length; i++) {
        if (tableauDonneesAvion[i].longitude != null && tableauDonneesAvion[i].latitude != null) {
            const longitudeFly = tableauDonneesAvion[i].longitude;
            const latitudeFly = tableauDonneesAvion[i].latitude;
            const aircraft = tableauDonneesAvion[i].ICAO24;
            const flightnumber = tableauDonneesAvion[i].reference;
            marker = L.marker(([latitudeFly, longitudeFly]), {
                icon: icone
            }).addTo(map);
                .bindPopup(`<b>${reference || 'Inconnu'}</b><br>${airline || ''}`);
                currentMarkers.push(marker);
            

            let popup = `<div class="popup">
                    <div>
                    <h2>Numéro d'appareil: ${aircraft}</h2>
                    <p>Numéro de vol :${flightnumber}</p>
                    </div>
                    </div>`;
            marker.bindPopup(popup);
        }
    }
}








async function SearchAirline(tableauDonneesAvion) {
    for (let k in tableauDonneesAvion) {
        if (tableauDonneesAvion[k].reference != null && tableauDonneesAvion[k].reference != '') {
            if (airlines.hasOwnProperty(tableauDonneesAvion[k].reference.substring(0, 3))) {
                tableauDonneesAvion[k].airline = airlines[tableauDonneesAvion[k].reference.substring(0, 3)].name;
            }
        }
    }
    return tableauDonneesAvion
}


let currentMarkers = [];

function clearMapMarkers() {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
}

async function loadPlanesInMapView() {
    const bounds = map.getBounds();
    const lamin = bounds.getSouth();
    const lamax = bounds.getNorth();
    const lomin = bounds.getWest();
    const lomax = bounds.getEast();

    const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;

    const response = await fetch(url);
    const data = await response.json();
    const planes = await donneeAvion(data.states);
    const planesData = await SearchAirline(planes);
    clearMapMarkers(); // on nettoie l’ancienne couche
    await planesCordinates(planesData);

}


map.on('moveend', () => {
    loadPlanesInMapView();
});