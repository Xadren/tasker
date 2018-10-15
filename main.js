document.addEventListener("DOMContentLoaded", function(event) { 
    const add_project_button = document.getElementById("add-project");
    const project_modal = new ProjectModal();
    const close_project_modal = document.getElementById("project-modal_close");
    const new_task_button = document.getElementById("new-task-button");
    add_project_button.addEventListener("click", event => {
        console.log("Add project clicked");
        project_modal.show();
    })

    close_project_modal.addEventListener("click", event => {
        project_modal.close();
    })

    new_task_button.addEventListener("click", event => {
        project_modal.newTask();
    })
});

class Project{
    constructor(name, due_date, description, sub_tasks, weightings){
        this.name = name;
        this.due_date = due_date;
        this.description = description;
        this.sub_tasks = sub_tasks;
        this.weightings = weightings;
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
        const date_input = document.querySelector(".project-form>input[name='due-date']");
        date_input.value = current_date_string;
        this.modal.style.display = "block";
    }

    /**
     * Close the project modal and hide it from view.
     */
    close(){
        this.modal.style.display = "none";
    }

    newTask(){
        const tasks_right = document.querySelector(".project-tasks_right");
        const tasks_left = document.querySelector(".project-tasks_left");
        const tasks_middle = document.querySelector(".project-tasks_middle");
        tasks_left.insertAdjacentHTML('beforeend', `<br/><input type="text" class="project-task" placeholder="2.1 Proposal Presentation">`);
        tasks_right.insertAdjacentHTML('beforeend', `<br/><input type="number" class="task-weighting" min="0" max="100">`);
        tasks_middle.insertAdjacentHTML('beforeend', `<br/><textarea class="project-task-description"></textarea>`);
    }
    /**
     * Clear the form in the project modal.
     */
    clearForm(){

    }
}