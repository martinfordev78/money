const Trc20 = require('./Trc20');
const fetch = require('node-fetch');
const url = 'https://api.trongrid.io/wallet/gettransactioninfobyid';
const express = require('express');
const app = express();

app.get('/:ContractAddress',async function (req,res){
    const obj = new Trc20(req.params.ContractAddress,req.params.PrivateKey);
    let name = await obj.GetTokenName();
    let symbol = await obj.GetTokenSymbol();
    let decimal = await obj.GetTokenDecimal();

    res.json({TokenName:name,TokenSymbol:symbol,TokenDecimal:decimal});
});

app.get('/api/v1/transfer',async function (req,res){
    res.json({Message:'Welcome To Tether Trc20 Transfer'});

});

app.get('/api/v1/transfer/trc20/:ContractAddress/:PrivateKey/:ToAddress/:Amount',async function (req,res){
    const obj = new Trc20(req.params.ContractAddress,req.params.PrivateKey)
    let result =  obj.MoneyTransfer(req.params.ToAddress,req.params.Amount)
    console.log(result)
    res.send(result);
    console.log('End transfer')
    console.log(Date.now());
});

app.get('/api/v1/transfer/checker/:id',function (req,res){
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({value: req.params.id})
    };
    fetch(url, options)
        .then(res => res.json())
        .then(json => res.json({'result':json.receipt.result}))
        .catch(err => console.error('error:' + err));
});

app.listen(process.env.port || 3000);