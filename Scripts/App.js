import Calculator from "./calculate";
import Task from "./Task";

let counter = 0;
class Application {
    constructor() {
        document.querySelector('.add__goal a').addEventListener('click', this.Run);
    }
    //Метод запускающий программу
    Run(e) {
        let name = document.querySelector('#task__name').value,
            sum  = Number(document.querySelector('#task__sum').value),
            term = Number(document.querySelector('#task__term').value),
            allGoals = document.querySelector('.all__goals'),
            starterSum  = Number(document.querySelector('#task__start__sum').value);
        e.preventDefault();
        const task = new Task(name,sum,term,starterSum); // our inputs here
        const calculate = new Calculator();
        //Калькулятор считающий элемесячный платеж
        calculate.calc(task).then(
            result =>{
                // Создание блока с задачей
                let div = document.createElement('div');
                div.classList.add('goal');
                div.id = `task-${counter}`;
                allGoals.append(div);
                let desc = document.createElement('div');
                desc.classList.add("goal-description");

                //********СОЗДАНИЕ БЛОКА******
                //Название задачи в виде инпута
                let goalNameBlock = document.createElement('h3');
                let goalName = document.createElement('input');
                goalName.classList.add('goal__name');
                goalName.setAttribute('value',`${task.name}`);
                goalName.setAttribute('readonly',`readonly`);
                goalName.classList.add('title');

                goalNameBlock.append(goalName);
                desc.append(goalNameBlock);
                // Срок в виде инпута
                let term = document.createElement('p');
                term.innerHTML=`Кол-во месяцев:`;
                let termName = document.createElement('input');
                termName.classList.add('term__name');
                termName.setAttribute('value',`${task.term}`);
                termName.setAttribute('readonly',`readonly`);

                term.append(termName);
                desc.append(term);

                //Начальная сумма в виде инпута
                let startSum = document.createElement('p');
                startSum.innerHTML=`Начальная Сумма:`;
                let startSumName = document.createElement('input');
                startSumName.classList.add('start__name');
                startSumName.setAttribute('value',`${task.starterSum}`);
                startSumName.setAttribute('readonly',`readonly`);

                startSum.append(startSumName);
                desc.append(startSum);


                //Желаемая сумма
                let finalAmountBlock = document.createElement('p');
                finalAmountBlock.innerHTML=`конечная сумма:`;
                let finalAmount = document.createElement('input');
                finalAmount.classList.add('final__Amount');
                finalAmount.setAttribute('value',`${task.sum}`);
                finalAmount.setAttribute('readonly',`readonly`);

                finalAmountBlock.append(finalAmount);
                desc.append(finalAmountBlock);
                // Ежемесячный платеж
                let monthlyBlock = document.createElement('p');
                monthlyBlock.innerHTML = `Ежемесячное пополнение: ${result.toFixed(2)}`;
                monthlyBlock.classList.add('monthly__add');
                desc.append(monthlyBlock);
                div.append(desc);

                //*******РЕДАКТИРОВАНИЕ ЭЛЕМЕНТОВ ПРИ ПОМОЧИ ОБРАБОТЧИКОВ СОБЫТИЙ******
                //Создание кнопки редактировать
                // let redact = document.createElement('img');
                // redact.setAttribute('src','https://image.flaticon.com/icons/svg/1160/1160515.svg');
                // redact.classList.add('red');
                let getControl = document.createElement('div');
                getControl.classList.add('goal-control');
                div.append(getControl);

                let redact = document.createElement('button');
                redact.innerHTML =`🖉`;
                redact.classList.add('edit-button');
                //Создание кнопки закрытия
                // let closeButton = document.createElement('img');
                // closeButton.classList.add('close');
                // closeButton.setAttribute('src','https://image.flaticon.com/icons/svg/190/190406.svg');
                let closeButton = document.createElement('button');
                closeButton.innerHTML =` &#9932;`;
                closeButton.classList.add('delete-button');

                getControl.appendChild(redact);
                getControl.appendChild(closeButton);
                closeButton.addEventListener('click',closeBlock);
                counter++;
                //Логика нажатия на кнопку редактировать
                redact.addEventListener('click',(e) =>{
                   e.preventDefault();
                       let monthlyAdd = e.target.parentNode.parentNode.querySelector('.monthly__add'),//Поле ежемесячного платежа
                       inputs = e.target.parentNode.parentNode.querySelectorAll('input');//Поля ввода внутри блока goal
                       inputs.forEach(el => {
                           el.removeAttribute('readonly');
                           el.classList.add('edit')
                           // background-color: rgb(27, 17, 17) - надо добавить самостоятельно как style



                       });// Отключение атрибута readonly  во всех инпутах
                       let save = document.createElement('button');//Создание кнопки сохранения
                        save.classList.add('save-button');
                        save.innerHTML=`&#128190;`;
                        getControl.insertBefore(save,closeButton);


                        redact.style.display ='none';//Отключение кнопки педактирования


                        //Логика сохранения и пересчет введенных данных
                        save.addEventListener('click',(e) =>{
                           e.preventDefault();
                           let termCount = +(e.target.parentNode.parentNode.querySelector('.term__name').value), // Инициализация всех инпутов
                               titleName = e.target.parentNode.parentNode.querySelector('.title').value,
                               finalName = +(e.target.parentNode.parentNode.querySelector('.final__Amount').value),
                               startSumName = +(e.target.parentNode.parentNode.querySelector('.start__name').value);

                           const newTasks = new Task(titleName,finalName,termCount,startSumName); // Создание прототипа класса  Task
                           const calculateInside = new Calculator(); // Создание прототипа класса  Calculator
                           //Передача прототипа в функцию прототипа класса Calculator
                           calculateInside.calc(newTasks).then(
                               result => {
                                    inputs.forEach(el => {
                                        el.setAttribute('readonly','readonly');
                                        el.classList.remove('edit');
                                    });//Добавления атрибута readonly у всех инпутов
                                    redact.style.display ='inline'; // Возвращение кнопки редактирование
                                    save.style.display ='none'; // Удаление кнопки сохранения

                                    return monthlyAdd.innerHTML = `Ежемесячное пополнение: ${result.toFixed(2)}`; // Изменение ежемесяной оплаты по новым данным
                               }
                           )
                       });
                });
            }

        )
    }
}
//Функция закрытия блока
function closeBlock(e) {
    e.preventDefault();
    if(confirm('Вы уверены что хотите удалить?')){
        e.target.parentNode.parentNode.remove();
    }
}
new Application();