class TodoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(text) {
        this.tasks.push({ text, completed: false });
        this.save();
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.save();
    }

    deleteCompletedTasks() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.save();
    }

    save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}