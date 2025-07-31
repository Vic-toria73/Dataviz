import { postData, getData, recupAPI } from './dom.js'
import { donneeAvion, planesCordinates } from './script.js'
import { searchCity } from './scriptDataVizMAP.js'

const btnToken = document.getElementById('btn_token')
const btnFree = document.getElementById('btn_free')
const divAccueil = document.getElementById('div_accueil')
const divMap = document.getElementById('div_map')
const imgPlane = document.getElementById('img_plane')
const btnSearch = document.getElementById('btnSearch')
const cloud = document.querySelector('.cloud')

btnFree.addEventListener('click', async () => {

    imgPlane.style.display = "flex"
    divAccueil.style.display = 'none'

    const data = await recupAPI()
    const planes = await donneeAvion(data)
    console.log(planes)

    planesCordinates(planes)
    setTimeout(() => {
        cloud.style.display = 'none'
        imgPlane.style.display = "none"
        divMap.style.visibility = "visible"
        
    }, 8000);

})

btnToken.addEventListener('click', async () => {
    imgPlane.style.display = "flex"
    divAccueil.style.display = 'none'

    const inputToken = document.getElementById('input_token')
    let secretCode = inputToken.value
    const token = await postData(secretCode)
    const data = await getData(token)
    const planes = await donneeAvion(data)
    planesCordinates(planes)
    setTimeout(() => {
        cloud.style.display = 'none'
        imgPlane.style.display = "none"
        divMap.style.visibility = "visible"
    }, 8000);
    inputToken.innerText = ''
})


btnSearch.addEventListener('click', async () => {
    await searchCity()
})






