document.addEventListener("DOMContentLoaded", function(event) { 
    
});

class Task{
    constructor(name, due_date, description, sub_tasks, weightings){
        this.name = name;
        this.due_date = due_date;
        this.description = description;
        this.sub_tasks = sub_tasks;
        this.weightings = weightings;
    }
}