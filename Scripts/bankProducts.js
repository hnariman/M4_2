export default class BankProducts {
    constructor (){
        this.listOfBanks=[];
    }
    getBanks(){
        return new Promise(resolve => {
           let array =  fetch(`https://5e8e012722d8cd0016a79e5c.mockapi.io/deposits`);
            resolve(array);
        })
    }
}