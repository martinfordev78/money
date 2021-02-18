const fetch = require('node-fetch');

const url = 'https://api.trongrid.io/wallet/gettransactioninfobyid';

const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({value: '80cc477b71738608bbc4a3eb546dcde80cdfcd7bf6bd7581953de8d951963e04'})
};

fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));