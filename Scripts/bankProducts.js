export default class BankProducts {
    constructor (){
        this.listOfBanks=[];
    }
    getBanks(){
        return new Promise(resolve => {
           let array =  fetch(`https://bolta.herokuapp.com/deposits`);
           resolve(array);
        })
    }
}