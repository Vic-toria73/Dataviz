async function recupAPI(){
    const res = await fetch ('https://opensky-network.org/api/states/all')
    const data = await res.json()
    return data.states
}


async function postData(token) {
    const response = await fetch("https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            'client_id': 'viky-api-client',
            'client_secret': `${token}`,
            'grant_type': 'client_credentials'
        })
    })
    const data = await response.json()
    return (data.access_token)
}

async function getData(token)
{
    const response = await fetch("https://opensky-network.org/api/states/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    return (data.states)
}




export {postData, getData, recupAPI}