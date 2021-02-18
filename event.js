const TronWeb = require('tronweb')
const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; //mainnet USDT contract
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "2c851b90b5c500685aa22cda033a5f190caf789e36e5bec75462678767bb82e9";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

let contract =  tronWeb.contract().at(trc20ContractAddress);
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
//contract.[eventname].watch(callback) enventname is the name of the event of the contract
await contract && contract.Transfer().watch((err, event) => {
    if(err)
        return console.error('Error with "Message" event:', err);

    console.group('New event received');
    console.log('- Contract Address:', event.contract);
    console.log('- Event Name:', event.name);
    console.log('- Transaction:', event.transaction);
    console.log('- Block number:', event.block);
    console.log('- Result:', event.result, '\n');
    console.groupEnd();
});