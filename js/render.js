import {sliderContainer} from "./slider.js";
import {deletedTasksContainer} from "./form.js";
import {notebookTaskContainer} from "./form.js";

const template = document.querySelector(".template_task");
const templateContent = template.content;
const completedTaskContainer = document.querySelector(".completed_tasks_container");
const notebookTasks = document.querySelectorAll(".notebook_task");
export let savedTasks = [];

export function renderTask({taskTitle, taskDesc, state, id}) {
    const node = templateContent.querySelector(".notebook_task");
    const noteBookTask = node.cloneNode(true);
    noteBookTask.querySelector(".title").textContent = taskTitle;
    noteBookTask.querySelector(".description").textContent = taskDesc;
    noteBookTask.setAttribute("data-id", `${id}`)

    switch (state) {
        case "deleted":
            deletedTasksContainer.append(noteBookTask);
            noteBookTask.querySelector(".button__delete").style.display = "none";
            noteBookTask.querySelector(".button__done").style.display = "none";
            break;
        case "done":
            completedTaskContainer.append(noteBookTask);
            noteBookTask.querySelector(".button__done").style.display = "none";
            break;
        case "active":
            notebookTaskContainer.append(noteBookTask);
            noteBookTask.querySelector(".button__add").style.display = "none";
            break;
        default:
            break;
    }
}

sliderContainer.addEventListener("click", event => {
    let target = event.target;
    let notebookTask = target.closest(".notebook_task");

    if (notebookTask) {
        let taskId = notebookTask.getAttribute("data-id");
        let todo = savedTasks.find(todo => todo.id === taskId);

        if (todo) {
            if (target.closest(".button__delete")) {
                notebookTask.remove();
                todo.state = "deleted";
                renderTask(todo);
            } else if (target.closest(".button__done")) {
                notebookTask.remove();
                todo.state = "done";
                renderTask(todo);
            } else if (target.closest(".button__add")) {
                notebookTask.remove();
                todo.state = "active";
                renderTask(todo);
            }
        }
    }
})

console.log(notebookTasks);

window.addEventListener("beforeunload", event => {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
})

document.addEventListener("DOMContentLoaded", event => {
    if (localStorage.length > 0) {
        savedTasks = JSON.parse(localStorage.getItem("tasks"));
        savedTasks.forEach(data => renderTask(data));
    }
})




