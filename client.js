//const fetch = require('node-fetch');

const url = 'http://localhost:3500/'
const fetchFunctions = async () => { 
    const response = await fetch(url, {
        method: 'GET',
        url: 'http://localhost:3500',
        params: {name: 'iPhone'},
        headers: {
            'X-RapidAPI-Key': KEY
          }
    })
    const data = await response.json()
    console.log(data)
}


fetchFunctions()
