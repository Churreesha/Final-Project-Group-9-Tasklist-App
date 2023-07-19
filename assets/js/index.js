const taskManager = new TaskManager(0);

taskManager.load();
taskManager.render();

const taskForm = document.querySelector("#task-form");

// On submit event listener (task 5.4.2)
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Inputs and values (task 4.2.3)
    const taskNameInput = document.querySelector("#task-name");
    const descriptionInput = document.querySelector("#description");
    const assignedToInput = document.querySelector("#assigned-to");
    const dueDateInput = document.querySelector("#due-date");
    const taskName = taskNameInput.value;
    const description = descriptionInput.value;
    const assignedTo = assignedToInput.value;
    const dueDate = dueDateInput.value;
    
    const alertContainer = document.querySelector('#alert-container');

    // Validation (task 4.3)
    if (!taskName || !description || !assignedTo || !dueDate) {
        alertContainer.innerHTML = `<div class="alert alert-secondary text-center" role="alert">Oops! Please fill out all the fields below to add your task.</div>`;
        return; // Ends function execution
    }
    
    alertContainer.innerHTML = ''; // Removes alert on valid submission

    taskManager.addTask(taskName, description, assignedTo, dueDate); //(task 5.4.3)
    taskManager.render(); // task 6.3.2
    taskManager.save();

    // Clear form (task 5.4.4)
    taskNameInput.value = '';
    descriptionInput.value = '';
    assignedToInput.value = '';
    dueDateInput.value = '';   
});

// Task list selector and event listener (task 7.2)
const tasksList = document.querySelector('#task-cards');

tasksList.addEventListener('click', (e) => {

    // Updates clicked task to 'Done' (task 7.5)
    if (e.target.classList.contains('done-btn')) {
        const btnParent = e.target.parentElement;
        const parentCard = btnParent.parentElement;
        const parentTask = parentCard.parentElement;
        
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);
        
        if (task) {
            task.status = 'Done';
            taskManager.render();
            taskManager.save();
        }
    }

     //'Marked as done button' disappear when clicked
         const doneBtn = document.querySelector('.done-btn');
         if (doneBtn) {
             doneBtn.style.display = 'none';
     }    

    // Deletes clicked task ()
    if (e.target.classList.contains('delete-btn')) {    
        const parentCard = e.target.parentElement;
        const parentTask = parentCard.parentElement;

        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);

        if (task) {
            taskManager.deleteTask(taskId);
            taskManager.render();
            taskManager.save();
        }
    }

    
});

