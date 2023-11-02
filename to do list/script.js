// Task List
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Load tasks from local storage when the page loads
window.addEventListener("load", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const taskText of tasks) {
        addTask(taskText);
    }
}

function addTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = "";

    // Save the updated task list to local storage
    saveTasks();
}

function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
    saveTasks();
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null) {
        span.textContent = newText;
        saveTasks();
    }
}

taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask(taskInput.value);
    }
});

function saveTasks() {
    const tasks = [];
    const taskElements = taskList.getElementsByTagName("li");
    for (const taskElement of taskElements) {
        const span = taskElement.querySelector("span");
        tasks.push(span.textContent);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
