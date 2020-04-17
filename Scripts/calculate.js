import BankProducts from "./bankProducts";

export default class Calculator{
    calc(data){
        let list = new BankProducts();
        let orders = [];
        return new Promise(resolve => {
            list.getBanks()
            .then(response => {
                if(!response.ok) {
                    throw 'Что-то пошло не так :)';
                }
                return response;
            })
            .then(
                result => result.json(),
            )
            .then(
                result => {
                    if(result == undefined) {
                        throw 'Что-то пошло не так :)';
                    }
                    let pay;
                    orders.push(result);
                    let newArray = orders[0].filter(function (el){
                        return el.minTerm<=data.term &&
                            el.maxTerm>=data.term &&
                            el.minSumm<=data.sum
                    });
                    newArray.forEach(el=>{
                        pay = (data.sum- (data.starterSum * Math.pow(1 + (el.income / 100) / 12,data.term)))/pow(data.term, el.income);
                    });
                    function pow(time,annual){//Цикл меняющий ещемесячный взнос в зависимости от количества месяцев
                        let power = 0;
                        for(let i=time;i>0;i--){
                            power += Math.pow(1+(annual/100)/12,i);
                        }
                        return (power);
                    }
                    resolve (pay);
                }
            )
            .catch(error => console.warn(error));

        })
    }
}