import Calculator from "./calculate";
import Validator from "./Validator";
import Task from "./Task";



let counter = 0;
const GOAL__LIST = {};
class Application {
    constructor() {
        //  Add buttons listeners
        document.querySelector('.add__goal a').addEventListener('click', this.Run);
        document.querySelector('.edit-button').addEventListener('click', this.handleEditClick);
        //  Clear inputs from last iteration
        document.querySelector('#task__name').value = '';
        document.querySelector('#task__sum').value = '';
        document.querySelector('#task__start__sum').value = '';
        document.querySelector('#task__term').value = '';
    }
    Run(e) {
        e.preventDefault();
        //  Get data from inputs and create structure from them
        let name        = document.querySelector('#task__name').value,
            sum         = Number(document.querySelector('#task__sum').value),
            term        = Number(document.querySelector('#task__term').value),
            allGoals    = document.querySelector('.all__goals'),
            starterSum  = Number(document.querySelector('#task__start__sum').value);
        const task      = new Task(name,sum,term,starterSum);
        
        //  Validate inputs via vaidator
        const validator = new Validator(task);
        if(validator.validate() == false) {
            return;
        }

        //  Сlear inputs from last iteration
        document.querySelector('#task__name').value         = '';
        document.querySelector('#task__sum').value          = '';
        document.querySelector('#task__term').value         = '';
        document.querySelector('#task__start__sum').value   = '';

        //  Start calculate and produce a result
        const calculate = new Calculator();
        calculate.calc(task)
        .then(
            result => {
                //  If we can't find or API can't give response
                if(result == undefined) {
                    throw 'Что-то пошло не так :)';
                }
                //  Add goal
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

                //  Save task in global variable 
                GOAL__LIST[div.id] = task;

                //  Add goal delete button and delete handler 
                const deleteButton = document.createElement('div');
                deleteButton.innerHTML = '&#10060;';
                deleteButton.classList.add('delete__button');
                deleteButton.addEventListener('click', (e) => {
                    const removableGoal     = e.currentTarget.parentElement;
                    const removableGoalId   = removableGoal.id;
                    //  Delete from DOM and GlobalList
                    removableGoal.parentElement.removeChild(removableGoal);
                    delete GOAL__LIST[removableGoalId];
                });
                div.append(deleteButton);

                //  Add editing click to div and handler
                div.addEventListener('click', (e) => {
                    const editableDiv = e.currentTarget;
                    if(e.target == deleteButton) {
                        return;
                    }
                    const taskId = editableDiv.id;
                    //  Add taskID data to inputs
                    document.querySelector('#task__name').value         = GOAL__LIST[taskId].name;
                    document.querySelector('#task__sum').value          = GOAL__LIST[taskId].sum;
                    document.querySelector('#task__term').value         = GOAL__LIST[taskId].term;
                    document.querySelector('#task__start__sum').value   = GOAL__LIST[taskId].starterSum;
                    // Change buttons: hide add button and mae visile edit button
                    document.querySelector('.add-button').style.display = 'none';
                    document.querySelector('.edit-button').style.display = 'inline';
                    // So we change inputs and call function handleEditClick
                });
            }
        )
        .catch(error => {
            alert(error);
        });
    }
    handleEditClick(e) {
        const editButton = e.currentTarget;
        editButton.style.display = 'none';
        document.querySelector('.add-button').style.display = 'inline';
        // Edit logic here
        // ...

    }
}

new Application();