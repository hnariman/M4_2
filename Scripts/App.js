import Calculator from "./calculate";

import Task from "./Task";
class Application {
    constructor() {
        document.querySelector('.add__target a').addEventListener('click', this.Run);
    }

    Run(e) {
        let name = document.querySelector('#task__name').value,
            sum  = Number(document.querySelector('#task__sum').value),
            term = Number(document.querySelector('#task__term').value),
            container = document.querySelector('.container'),
            wrapperBlock = document.querySelector('.block'),
            starterSum  = Number(document.querySelector('#task__start__sum').value);
        e.preventDefault();
        const task = new Task(name,sum,term,starterSum); // our inputs here
        const calculate = new Calculator();
        calculate.calc(task).then(
            result =>{
                wrapperBlock.classList.add('task__wrapper');
                let wrapper= document.createElement('DIV');
                wrapper.classList.add('wrapper');
                wrapperBlock.appendChild(wrapper);
                let p = document.createElement('p');
                p.innerHTML = task.name;
                wrapper.appendChild(p);
                let table = document.createElement('table');
                table.innerHTML = `
                    <tr>
                        <td>Сумма</td>
                        <td>${task.sum}</td>
                    </tr>
                     <tr>
                        <td>Срок</td>
                        <td>${task.term}</td>
                    </tr>
                     <tr>
                        <td>Стартовая сумма</td>
                        <td>${task.starterSum}</td>
                    </tr>
                     <tr>
                        <td>Ежемесячное пополнение</td>
                        <td>${result.toFixed(2)}</td>
                    </tr>
                `;
                wrapper.appendChild(table);
            }
        )
    }
}

new Application();