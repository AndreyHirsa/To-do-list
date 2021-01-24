"use strict"


const buttonAddTask = document.querySelector(".button__add");
const taskForm = document.querySelector(".task_form");
const fade = document.querySelector(".popup__fade");
const buttonClose = document.querySelector(".button__close");
const warning = document.querySelectorAll(".warning");
const buttonSubmit = document.querySelector(".button__submit");
const taskName = document.getElementById("task_name");
const taskDescription = document.getElementById("task_description");
const notebookTaskContainer = document.querySelector(".notebook_task_container");
const completedTasksContainer = document.querySelector(".completed_tasks_container");
const deletedTasksContainer = document.querySelector(".notebook_deleted_tasks_container");
const task = document.querySelector(".notebook_task");
let timeout = null;



buttonAddTask.addEventListener("click", () => {
    fade.style.display = "unset";
})



document.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
        fade.style.display = "none";
    }
});


buttonClose.addEventListener("click", () => {
    fade.style.display = "none";
})


function buttonDisabled() {
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.classList.add("button__disabled");
}

function buttonEnabled() {
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.classList.remove("button__disabled");
}


function nameParams() {
    return taskName.value.trim().length > 5;
}

function descriptionParams() {
    return taskDescription.value.trim().length < 100;
}


function checkParams() {
    if (nameParams() && descriptionParams()) {
        buttonEnabled();
    } else {
        buttonDisabled();
    }
}


taskName.addEventListener('input', event => {
    checkParams()
    clearTimeout(timeout);
    if (!nameParams()) {
        timeout = setTimeout(function () {
            return warning[0].textContent = `Введите больше 5 символов`;
        }, 1500);
    } else {
        warning[0].textContent = "";
    }
})


taskDescription.addEventListener('input', event => {
    checkParams()
    !descriptionParams()?warning[1].textContent = "Cлишком длинное описание!":warning[1].textContent = "";
})



taskForm.addEventListener("submit", (event) => {

    event.preventDefault();

    buttonDisabled();

    let obj = {
        taskTitle: taskName.value,
        taskDesc: taskDescription.value,
        state: "active",
        id: Math.random().toFixed(5)
    }
    savedTasks.push(obj);
    renderTask(obj);
    taskName.value = "";
    taskDescription.value = "";
})
















