document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const deleteCompletedBtn = document.getElementById('deleteCompleted');

    const todoList = new TodoList();

    function renderTasks() {
        taskList.innerHTML = '';
        todoList.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            `;
            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                todoList.toggleTask(index);
                renderTasks();
            });
            taskList.appendChild(li);
        });
        updateDeleteCompletedButton();
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            todoList.addTask(text);
            renderTasks();
            taskInput.value = '';
        }
    }

    function updateDeleteCompletedButton() {
        const hasCompletedTasks = todoList.tasks.some(task => task.completed);
        deleteCompletedBtn.style.display = hasCompletedTasks ? 'block' : 'none';
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    deleteCompletedBtn.addEventListener('click', () => {
        todoList.deleteCompletedTasks();
        renderTasks();
    });

    renderTasks();
});