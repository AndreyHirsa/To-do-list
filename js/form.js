export const taskName = document.getElementById("task_name");
export const taskDescription = document.getElementById("task_description");
export let savedTasks = [];

import {renderTask} from "./render.js";
import {formDisabled, formValidation, nameValidation, descriptionValidation} from "./formValidation.js";

const wrongDescription = document.querySelector(".wrong_description");
const wrongName = document.querySelector(".wrong_name");
const buttonAddTask = document.querySelector(".button__add");
const taskForm = document.querySelector(".task_form");
const fade = document.querySelector(".popup__fade");
const buttonClose = document.querySelector(".button__close");
let timeout = null;

function hideForm() {
    fade.style.display = "none";
    taskName.value = "";
    taskDescription.value = "";
    return true;
}

buttonAddTask.addEventListener("click", () => {
    fade.style.display = "unset";
})

document.addEventListener('keydown', event => {
    if (event.key === "Escape") {
        hideForm()
    }
});

buttonClose.addEventListener("click", () => {
    hideForm()
})

taskName.addEventListener('input', event => {
    formValidation();
    clearTimeout(timeout);

    if (!nameValidation()) {
        timeout = setTimeout(function () {
            return wrongName.textContent = `Введите больше 5 символов`;
        }, 1500);
    } else {
        wrongName.textContent = "";
    }
})

taskDescription.addEventListener('input', event => {
    formValidation();
    !descriptionValidation() ? wrongDescription.textContent = "Cлишком длинное описание!" : wrongDescription.textContent = "";
})


taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formDisabled();

    const obj = {
        taskTitle: taskName.value,
        taskDesc: taskDescription.value,
        state: "active",
        id: Math.random().toFixed(5)
    }
    savedTasks.push(obj);
    renderTask(obj);
    hideForm()
})

window.addEventListener("beforeunload", event => {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
})

document.addEventListener("DOMContentLoaded", event => {
    if (localStorage.length > 0) {
        savedTasks = JSON.parse(localStorage.getItem("tasks"));
        savedTasks.forEach(data => renderTask(data));
    }
})
















