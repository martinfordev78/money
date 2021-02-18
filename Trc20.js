
const TronWeb = require('tronweb');
class Trc20 {

    constructor(ContractAddress,Privatekey) {
        this.Trc20ContractAddress = ContractAddress;

        this.HttpProvider = TronWeb.providers.HttpProvider;
        this.fullNode = new this.HttpProvider("https://api.trongrid.io");
        this.solidityNode = new this.HttpProvider("https://api.trongrid.io");
        this.eventServer = new this.HttpProvider("https://api.trongrid.io");
        this.privateKey = Privatekey;
        this.tronWeb = new TronWeb(this.fullNode,this.solidityNode,this.eventServer,this.privateKey);

    }

    async GetTokenName(){
        try {
            let contract = await this.tronWeb.contract().at(this.Trc20ContractAddress);
            let result = await contract.name().call();
            console.log('Token Name: ',await result);
            return await result;
        } catch(error) {
            console.error("trigger smart contract error",error)
        }
    }

    async GetTokenSymbol(){
        try {
            let contract = await this.tronWeb.contract().at(this.Trc20ContractAddress);
            let result = await contract.symbol().call();
            console.log('Token Symbol: ',await result);
            return await result;
        } catch(error) {
            console.error("trigger smart contract error",error)
        }
    }

    async GetTokenDecimal(){
        try {
            let contract = await this.tronWeb.contract().at(this.Trc20ContractAddress);
            let result = await contract.decimals().call();
            console.log('Token Symbol: ',await result);
            return await result;
        } catch(error) {
            console.error("trigger smart contract error",error)
        }
    }

    async MoneyTransfer(Toaddress,Amount){
        try {
            let contract = await this.tronWeb.contract().at(this.Trc20ContractAddress);
            let result = await contract.transfer(
                Toaddress, //address _to
                Amount   //amount
            ).send({
                feeLimit: 1000000
            }).then(output => {console.log('- Output:', output, '\n');});//=>console.log('- Output:', output, '\n');
            console.log('result: ', result);
            return   result;
        } catch(error) {
            console.error("trigger smart contract error",error)
            return await error;
        }
    }
}
module.exports = Trc20