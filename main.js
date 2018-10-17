document.addEventListener("DOMContentLoaded", function(event) {
    const taskerList = new TaskerList(); 
    const add_project_button = document.getElementById("add-project");
    const project_modal = new ProjectModal();
    const close_project_modal = document.getElementById("project-modal_close");
    const new_task_button = document.getElementById("new-task-button");
    const confirm_add_project = document.getElementById("confirm-add-project");

    const __projects = new Array();

    
    add_project_button.addEventListener("click", event => {
        console.log("Add project clicked");
        project_modal.show();
    })

    confirm_add_project.addEventListener("click", event => {
        const project_name = document.querySelector("input[name='project-name']").value;
        const due_date = document.querySelector("input[name='due-date']").value;
        const category_select = document.querySelector(".project-categories");
        const category = category_select.options[category_select.selectedIndex].value
        const tasks = new Array();
        // Get all the task names.
        const task_names = document.querySelectorAll(".task-group");
        [].slice.call(task_names).forEach(task =>{
            const task_num = task.dataset.taskNum;
            const task_name = document.querySelector(`input.task-name[data-task-num='${task_num}'`).value;
            // get the task description for this task
            const task_description = document.querySelector(`textarea.task-description[data-task-num='${task_num}'`).value;
            const task_weighting = document.querySelector(`input.task-weight[data-task-num='${task_num}'`).value;

            tasks.push({
                name: task_name,
                description: task_description,
                weight: task_weighting
            });
        })
        const project = new Project(project_name, due_date, category, tasks);

        __projects.push(project);

        taskerList.update(__projects);
        project_modal.close();
    })

    close_project_modal.addEventListener("click", event => {
        project_modal.close();
    })

    new_task_button.addEventListener("click", event => {
        project_modal.newTask();
    })
});


class TaskerList{
    constructor(){
        this.list_body = document.querySelector(".tasker-list");
    }

    update(projects){
        // Clear the whole list of tasks in the tasker list, and just repopulate the list again.
        // This is a shit way to do it, but it's the easiest way.
        while(this.list_body.firstChild){
            this.list_body.removeChild(this.list_body.firstChild);
        }

        // Sort the list based on project due dates.
        projects.sort((a, b) =>{
            return a.due_date - b.due_date;
        })

        // Populate the list.
        projects.forEach(project => {
            const project_output = this.fillTemplate(project);
            this.list_body.insertAdjacentHTML('beforeend', `${project_output}`);
        })
    }

    fillTemplate(project){
        const name = project.name;
        const due_date = project.due_date;
        let tasks = new String();
        debugger;
        project.tasks.forEach(task => {
            tasks += `
                <div class="task">
                    <strong>${task.name}</strong><br/>
                    <small>${task.weight}%</small><br/>
                    <p>${task.description}</p>
                </div>
            `;
        })

        const template = `
            <div class="project ${project.category}">
                <h1>${name}</h1>
                <strong>Due Date:</strong> ${due_date}
                <h2>Tasks</h2>
                <div class="tasks">
                    ${tasks}
                </div>
            </div>
        `;

        return template;
    }
}


class Project{
    constructor(name, due_date, category, tasks){
        this.name = name;
        this.due_date = due_date;
        this.tasks = tasks;
        this.category = category;
    }
}

class ProjectModal{
    constructor(){
        this.modal = document.getElementById("project-modal");
        this.modal_head = document.getElementById("project-modal_head");
        this.modal_body = document.getElementById("project-modal_body");
        this.modal_actions = document.getElementById("project-modal_actions");
    }

    /**
     * Show the project modal which allows a user to create a project.
     */
    show(){
        // Give the date input the current date as the default value.
        const current_date = new Date();
        const current_day = current_date.getDate();
        const current_month = current_date.getMonth() + 1; // We add one to the month because the getMonth() returns a 0 based value.
        const current_year = current_date.getFullYear();
        const current_date_string =`${current_year}-${current_month < 10 ? `0${current_month}` : current_month}-${current_day}`;
        const date_input = document.querySelector(".project-form>.project-details>.input-group>input[name='due-date']");
        date_input.value = current_date_string;

        // Clear the project name
        document.querySelector("input[name='project-name']").value = "";

        // Reset the project tasks.
        const tasks_div = document.querySelector(".project-tasks");
        while(tasks_div.firstChild){
                tasks_div.removeChild(tasks_div.firstChild);
        }

        tasks_div.insertAdjacentHTML('afterbegin', `
        <div class="task-group" data-task-num="0">
            <div class="input-group">      
                <input type="text" name="task-name" class="task-name" data-task-num="0" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Task Name</label>
            </div>
            <div class="input-group">      
                <input type="number" name="task-weight" class="task-weight" data-task-num="0" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Weight</label>
            </div>
            <div class="input-group">      
                <textarea data-task-num="0" class="task-description"></textarea>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Description</label>
            </div>
        </div>
        `)
        this.modal.style.display = "block";
    }

    /**
     * Close the project modal and hide it from view.
     */
    close(){
        this.modal.style.display = "none";
    }

    newTask(){
        const project_tasks = document.querySelector(".project-tasks");
        // Here we create an array of project task elements so that we can get the last of the elements to increment the task number.
        let last_task_num = [].slice.call(document.querySelectorAll(".task-group"));
        last_task_num = parseInt(last_task_num[last_task_num.length - 1].dataset.taskNum, 10);
        project_tasks.insertAdjacentHTML('beforeend',`
        <div class="task-group" data-task-num="${last_task_num + 1}">
            <div class="input-group">      
                <input type="text" name="task-name" class="task-name" data-task-num="${last_task_num + 1}" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Task Name</label>
            </div>
            <div class="input-group">      
                <input type="number" name="task-weight" class="task-weight" data-task-num="${last_task_num + 1}" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Weight</label>
            </div>
            <div class="input-group">      
                <textarea data-task-num="${last_task_num + 1}" class="task-description"></textarea>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Description</label>
            </div>
        </div>
        `);
    }
    /**
     * Clear the form in the project modal.
     */
    clearForm(){

    }
}