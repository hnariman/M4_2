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

                let goalNameBlock = document.createElement('h3');
                let goalName = document.createElement('input');
                goalName.classList.add('goal__name');
                goalName.setAttribute('value',`${task.name}`);
                goalName.setAttribute('readonly',`readonly`);
                goalName.classList.add('title');

                goalNameBlock.append(goalName);
                desc.append(goalNameBlock);

                let term = document.createElement('p');
                term.innerHTML=`Кол-во месяцев:`;
                let termName = document.createElement('input');
                termName.classList.add('term__name');
                termName.setAttribute('value',`${task.term}`);
                termName.setAttribute('readonly',`readonly`);

                term.append(termName);
                desc.append(term);


                let startSum = document.createElement('p');
                startSum.innerHTML=`Начальная Сумма:`;
                let startSumName = document.createElement('input');
                startSumName.classList.add('start__name');
                startSumName.setAttribute('value',`${task.starterSum}`);
                startSumName.setAttribute('readonly',`readonly`);

                startSum.append(startSumName);
                desc.append(startSum);



                let finalAmountBlock = document.createElement('p');
                finalAmountBlock.innerHTML=`конечная сумма:`;
                let finalAmount = document.createElement('input');
                finalAmount.classList.add('final__Amount');
                finalAmount.setAttribute('value',`${task.sum}`);
                finalAmount.setAttribute('readonly',`readonly`);

                finalAmountBlock.append(finalAmount);
                desc.append(finalAmountBlock);

                let monthlyBlock = document.createElement('p');
                monthlyBlock.innerHTML = `Ежемесячное пополнение: ${result.toFixed(2)}`;
                monthlyBlock.classList.add('monthly__add');
                desc.append(monthlyBlock);
                div.append(desc);



                let redact = document.createElement('img');
                redact.setAttribute('src','https://image.flaticon.com/icons/svg/1160/1160515.svg');
                redact.classList.add('red');
                let closeButton = document.createElement('img');
                closeButton.classList.add('close');
                closeButton.setAttribute('src','https://image.flaticon.com/icons/svg/190/190406.svg');
                div.appendChild(redact);
                div.appendChild(closeButton);
                closeButton.addEventListener('click',closeBlock);
                counter++;

                redact.addEventListener('click',(e) =>{
                   e.preventDefault();
                       let monthlyAdd = e.target.parentNode.querySelector('.monthly__add'),
                       inputs = e.target.parentNode.querySelectorAll('input');
                       inputs.forEach(el => el.removeAttribute('readonly'));
                       let save = document.createElement('img');
                        save.classList.add('red');
                        save.setAttribute('src','https://image.flaticon.com/icons/svg/380/380020.svg');
                        div.appendChild(save);
                        redact.style.display ='none';
                        save.addEventListener('click',(e) =>{
                           e.preventDefault();
                           let termCount = +(e.target.parentNode.querySelector('.term__name').value),
                               titleName = e.target.parentNode.querySelector('.title').value,
                               finalName = +(e.target.parentNode.querySelector('.final__Amount').value),
                               startSumName = +(e.target.parentNode.querySelector('.start__name').value);
                           const newTasks = new Task(titleName,finalName,termCount,startSumName);
                           const calculateInside = new Calculator();
                           calculateInside.calc(newTasks).then(
                               result => {
                                    inputs.forEach(el => el.setAttribute('readonly','readonly'));
                                    redact.style.display ='inline';
                                    save.style.display ='none';
                                    return monthlyAdd.innerHTML = `Ежемесячное пополнение: ${result.toFixed(2)}`;
                               }
                           )
                       });
                });
            }
        )
    }
}
function closeBlock(e) {
    e.preventDefault();
    e.target.parentNode.remove();
}
new Application();