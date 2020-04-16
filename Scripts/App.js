import Calculator from "./calculate";
import Task from "./Task";

let counter = 0;
class Application {
    constructor() {
        document.querySelector('.add__goal a').addEventListener('click', this.Run);
    }
    Run(e) {
        let name = document.querySelector('#task__name').value,
            sum  = Number(document.querySelector('#task__sum').value),
            term = Number(document.querySelector('#task__term').value),
            allGoals = document.querySelector('.all__goals'),
            starterSum  = Number(document.querySelector('#task__start__sum').value);
        e.preventDefault();
        const task = new Task(name,sum,term,starterSum); // our inputs here
        const calculate = new Calculator();
        calculate.calc(task).then(
            result =>{
                let div = document.createElement('div');
                div.classList.add('goal');
                div.id = `task-${counter}`;
                allGoals.append(div);
                let desc = document.createElement('div');
                desc.classList.add("goal-description");
                desc.innerHTML =`
                    <h3>${task.name}</h3>
                    <p> до: июль, 2021 </p>
                    <p> конечная сумма: ${task.sum} </p>
                    <p> Ежемесячное пополнение: ${result.toFixed(2)} </p>
                `;
                div.append(desc);
                counter++;
            }
        )
    }
}

new Application();