import { airlines} from './airlines.js'
import { postData, getData, recupAPI } from './dom.js'
import { countries } from './country.js'



const inputToken = document.getElementById('input_token')
const btnToken = document.getElementById('btn_token')
const btnFree = document.getElementById('btn_free')

const divMap = document.getElementById('div_map')
const divAccueil = document.getElementById('div_accueil')

const inputlat = document.getElementById('inputlat')
const inputlon = document.getElementById('inputlon')
const btnsearch = document.getElementById

async function homePage(data) {
    const planes = await donneeAvion(data)
    await planesCordinates(planes)
    divMap.style.visibility = "visible"
    divAccueil.style.display = "none"
    console.log(planes)
}

btnToken.addEventListener('click', async () => {
    let secretCode = inputToken.value
    const token = await postData(secretCode)
    const data = await getData(token)
    homePage(data)
})


btnFree.addEventListener('click', async () => {
    const data = await recupAPI()
    homePage(data)
})

//btns

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
        const coucou = airlines[0].icao
        if (tableauDonneesAvion[k].reference != null && tableauDonneesAvion[k].reference != '') {
            for (let i = 0; i < airlines.length; i++) {
                if ((tableauDonneesAvion[k].reference.substring(0, 3)) == airlines[i].icao) {
                    tableauDonneesAvion[k].airline = airlines[i].name
                }
            }
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

async function planesCordinates(planes) {
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
            marker = L.marker(([latitudeFly, longitudeFly]), {
                icon: icone,
                rotationAngle: track
            }).addTo(map)


            currentMarkers.push(marker)

            let popup =

                `<div class="popup">
                    <div>
                    <h2>Numéro d'appareil: ${aircraft}</h2>
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
    clearMapMarkers(); // on nettoie l’ancienne couche
    await planesCordinates(planes)

}


map.on('moveend', () => {
    loadPlanesInMapView();
})