// HTML to render on valid submission (task 6.1)
function createTaskHtml(id, taskName, description, assignedTo, dueDate, status) {
    return `<div class="col d-flex justify-content-center" data-task-id=${id}>
    <div class="card d-flex p-4 border-0 rounded-0 shadow">
        <button type="button" class="btn btn-link text-decoration-none text-danger small ms-auto p-0 lh-1 delete-btn">X</button>
        <h5 class="card-title text-center text-uppercase m-0 lh-1" id="done-status">${status}</h5>                
        <ul class="list-group list-group-flush my-auto">
            <li class="list-group-item border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill me-2" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
                ${taskName}
            </li>
            <li class="list-group-item border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book me-2" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
                ${description}
            </li>
            <li class="list-group-item border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle me-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                ${assignedTo}
            </li>
            <li class="list-group-item border-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4-event me-2" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
                     <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>
                ${dueDate}
            </li>
        </ul>
        <div class="text-center mt-auto">
            <button type="submit" class="btn btn-dark text-lowercase done-btn">Mark as Done</button>
        </div>
    </div>
</div>`;
}

// Manages tasks in app (task 5.2)
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Adding new task programmatically (task 5.3.3)
    addTask(taskName, description, assignedTo, dueDate, status) {
        const task = {
            id: this.currentId++,
            taskName: taskName,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status || 'To Do'  
        };
        this.tasks.push(task);
    }

    // Renders tasks (task 6.2)
    render() {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];

            const date = new Date(task.dueDate);
            const formattedDate = (date.getMonth() + 1) + '-' + (date.getDate() + 1) + '-' + date.getFullYear();

            const taskHTML = createTaskHtml(task.id, task.taskName, task.description, task.assignedTo, formattedDate, task.status);

            tasksHtmlList.push(taskHTML);
        }

        const tasksHtml = tasksHtmlList.join('\n');
        
        const tasksList = document.querySelector('#task-cards');
        tasksList.innerHTML = tasksHtml;
    }

    // Saves tasks to localStorage (task 8.1)
    save() {
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        const currentId = String(this.currentId);
        localStorage.setItem('currentId', currentId);
    }

    // Loads tasks from localStorage (task 8.2)
    load() {
        const savedTasks = localStorage.getItem('tasks');
        if(savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }

        const savedCurrentId = localStorage.getItem('currentId');
        if (savedCurrentId) {
            this.currentId = Number(savedCurrentId);
        }
    }

    // Finds matching task when called (task 7.4)
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
                break;
            }
        }
        return foundTask;
    }

    // Creates new array without selected element (task 9.2)
    deleteTask(taskId) {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }

}

module.exports = TaskManager