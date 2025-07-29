import { postData, getData, recupAPI } from './dom.js'
import { donneeAvion, planesCordinates } from './script.js'

const btnToken = document.getElementById('btn_token')
const btnFree = document.getElementById('btn_free')
const divAccueil = document.getElementById('div_accueil')
const divMap = document.getElementById('div_map') 
const imgPlane = document.getElementById('img_plane')


btnFree.addEventListener('click', async () => {
    imgPlane.style.display = "flex"
    divAccueil.style.display = 'none'

    const data = await recupAPI()
    const planes = await donneeAvion(data)
    planesCordinates(planes)
    setTimeout(() => {
        imgPlane.style.display = "none"
        divMap.style.visibility = "visible"
    }, 15000);

})

btnToken.addEventListener('click', async () => {
    imgPlane.style.display = "block"
    divAccueil.style.display = 'none'

    const inputToken = document.getElementById('input_token')
    let secretCode = inputToken.value
    const token = await postData(secretCode)
    const data = await getData(token)
    planesCordinates(planes)
    setTimeout(() => {
        imgPlane.style.display = "none"
        divMap.style.visibility = "visible"
        map.invalidateSize();
    }, 10000);
    inputToken.innerText = ''
})




