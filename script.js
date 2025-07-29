import { airlines} from './airlines.js'
import { countries } from './country.js'
import { map } from './scriptDataVizMAP.js'

async function donneeAvion(data) {
    let tableauDonneesAvion = []
    for (let k in data) {
        tableauDonneesAvion.push({
            'ICAO24': data[k][0],
            'reference': data[k][1],
            'provenance': data[k][2],
            'longitude': data[k][5],
            'latitude': data[k][6],
            'track': data[k][10]
        })
    }
    for (let k in tableauDonneesAvion) {
        if (tableauDonneesAvion[k].reference != null && tableauDonneesAvion[k].reference != '') {
            const icaoCode = tableauDonneesAvion[k].reference.substring(0, 3)
                tableauDonneesAvion[k].airline = airlines[icaoCode]
            /*
            } if (/^N\d/.test(tableauDonneesAvion[k].airline === true)){
                tableauDonneesAvion[k].airline = 'Petit avion privé / tourisme'
            } else {
                tableauDonneesAvion[k].airline = `Compagnie / type d'avion non trouvé`
            */
        }
    }
    return (tableauDonneesAvion)
}


function planesCordinates(planes) {
    for (let i = 0; i < planes.length; i++) {
        if (planes[i].longitude != null && planes[i].latitude != null) {
            const longitudeFly = planes[i].longitude
            const latitudeFly = planes[i].latitude
            const aircraft = planes[i].ICAO24
            const flightnumber = planes[i].reference
            const track = planes[i].track
            let airline = ''
            if (planes[i].airline == undefined) {
                airline = 'Compagnie aérienne non répertoriée'
            } else {
                airline = planes[i].airline
            }
            const provenance = planes[i].provenance
            let nameCountry = ''
            for (let j = 0; j < countries.length; j++) {
                if (countries[j].name == provenance) {
                    nameCountry = countries[j].flag_4x3
                    
                }
            }
            //on charge l'icone du marqueur
            let icone = L.icon({
                iconUrl: "/leaflet/images/plane.png",
                iconSize: [25, 25],
                iconAnchor: [12.5, 12.5],
                popupAnchor: [0, -12.5],
                rotationAngle: 0
            });
            

            let marker = L.marker(([latitudeFly, longitudeFly]), {
                icon: icone,
                rotationAngle: track
            }).addTo(map)


            currentMarkers.push(marker)

            let popup =

                `<div class="popup">
                    <div>
                    <h3>Numéro d'appareil: ${aircraft}</h3>
                    <p>Numéro de vol : ${flightnumber}</p>
                    <p>Airline : ${airline}</p>
                    <p>Pays de provenance : ${provenance} <img width="15" height="15" src="${nameCountry}"></p>
                    <p>Latitude : ${latitudeFly}</p>
                    <p>Longitude : ${longitudeFly}</p>
                    

                    </div>
                    </div>`
            marker.bindPopup(popup);
        }
    }
}


let currentMarkers = []

function clearMapMarkers() {
    currentMarkers.forEach(marker => map.removeLayer(marker))
    currentMarkers = []
}

async function loadPlanesInMapView() {
    const bounds = map.getBounds()
    const lamin = bounds.getSouth()
    const lamax = bounds.getNorth()
    const lomin = bounds.getWest()
    const lomax = bounds.getEast()

    const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`

    const response = await fetch(url)
    const data = await response.json()
    const planes = await donneeAvion(data.states)
    clearMapMarkers()
    planesCordinates(planes)

}


map.on('moveend', () => {
    loadPlanesInMapView()
})
    

export {donneeAvion, planesCordinates}