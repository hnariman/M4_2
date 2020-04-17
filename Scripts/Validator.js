export default class Validator {
    constructor(task) {
        this.task = task;
        this.errorListWrapper = document.querySelector('.add__goal ol');
    }

    validate() {
        let error = ``;
        this.errorListWrapper.innerHTML = error;
        if(this.task.sum > 0 && this.task.starterSum > 0 && this.task.term > 0 && this.task.sum > this.task.starterSum) {
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
        if(!(this.task.term > 0)) {
            error += `<li>Неверный формат срока цели</li>`;
        }
        this.errorListWrapper.innerHTML = error;
        
        return false;
    }


    validateEdit(id) {
        let errors = ``;
        if(document.getElementById(id).querySelector('ol')) {
            document.getElementById(id).querySelector('ol').remove();
        }
        if(this.task.sum > 0 && this.task.starterSum > 0 && this.task.term > 0 && this.task.sum > this.task.starterSum) {
            return true;
        }
        if(!(this.task.sum > 0)) {
            errors += `<li>Неверный формат желаемой суммы</li>`;
        }
        if(!(this.task.sum > this.task.starterSum)) {
            errors += `<li>Стартовая сумма не должна превышать желаемую сумму</li>`;
        }
        if(!(this.task.starterSum > 0)) {
            errors += `<li>Неверный формат стартовой суммы</li>`;
        }
        if(!(this.task.term > 0)) {
            errors += `<li>Неверный формат срока цели</li>`;
        }
        let errorWrapper = document.createElement('ol');
        errorWrapper.innerHTML = errors;
        document.getElementById(id).appendChild(errorWrapper);
        return false;
    }
}