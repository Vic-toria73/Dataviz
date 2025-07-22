/*
async function recupAPI(){
    const res = await fetch ('')
    const data = await res.json()
    const response = data.states
    console.log(response)
}
*/
//recupAPI()

let tableauDonnéesAvion = []

async function postData(url = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token")
{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
        'client_id': 'viky-api-client',
        'client_secret': 'sexdPDA7O6r450Le2bzzmdoLZRTgC9H9',
        'grant_type': 'client_credentials'
    })
    })
    const data = await response.json()
    return (data.access_token)
}

console.log(postData())

async function getData(url = "https://opensky-network.org/api/states/all")
{
    const token = await postData()
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log(data)
    return data
}

/*
async function APIinfosVol(){
    const response = await fetch ('https://api.aviationstack.com/v1/flights?access_key=c870189c76218103845bda49ec0b56a5')
    const data = await response.json()
    return data
}
*/

async function main() {
    const data = await getData();
    for (k in data.states){
        tableauDonnéesAvion.push({
            'ICAO24' : data.states[k][0],
            'reference' : data.states[k][1],
            'longitude' : data.states[k][5],
            'latitude' : data.states[k][6]
        })
    }
    console.log(tableauDonnéesAvion)

    //const dataInfosVol = await APIinfosVol()
    //console.log(dataInfosVol)
}

main();
