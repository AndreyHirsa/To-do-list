import {formDisabled} from "./formValidation.js";
import {taskName} from "./formValidation.js";
import {taskDescription} from "./formValidation.js";
import {savedTasks} from "./render.js";
import {renderTask} from "./render.js";

const buttonAddTask = document.querySelector(".button__add");
const taskForm = document.querySelector(".task_form");
const fade = document.querySelector(".popup__fade");
const buttonClose = document.querySelector(".button__close");
export const notebookTaskContainer = document.querySelector(".notebook_task_container");
export const deletedTasksContainer = document.querySelector(".notebook_deleted_tasks_container");

buttonAddTask.addEventListener("click", () => {
    fade.style.display = "unset";
})

document.addEventListener('keydown', event => {
    if (event.key === "Escape") {
        fade.style.display = "none";
        taskName.value = "";
        taskDescription.value = "";
    }
});

buttonClose.addEventListener("click", () => {
    fade.style.display = "none";
    taskName.value = "";
    taskDescription.value = "";
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
    taskName.value = "";
    taskDescription.value = "";
    fade.style.display = "none";
})
















