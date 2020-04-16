export default class Validator {
    constructor(task) {
        this.task = task;
        this.errorListWrapper = document.querySelector('#error__list');
    }

    validate() {
        let error = ``;
        this.errorListWrapper.innerHTML = error;
        if(this.task.sum > 0 && this.task.starterSum > 0 && this.term > 0 && this.task.sum > this.task.starterSum) {
            return true;
        }
        if(!(this.task.sum > 0)) {
            error += `<li>Неверный формат желаемой суммы</li>`;
        }
        if(!(this.task.sum > this.task.starterSum)) {
            error += `<li>Стартовая сумма не должна превышать желаемую сумму</li>`;
        }
        if(!(this.task.starterSum > 0)) {
            error += `<li>Неверный формат стартовой суммы</li>`;
        }
        if(!(this.term > 0)) {
            error += `<li>Неверный формат срока цели</li>`;
        }
        this.errorListWrapper.innerHTML = error;
        return false;
    }
}