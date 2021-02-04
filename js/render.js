export const notebookTaskContainer = document.querySelector(".notebook_task_container");
export const deletedTasksContainer = document.querySelector(".notebook_deleted_tasks_container");
const template = document.querySelector(".template_task");
const templateContent = template.content;
const completedTaskContainer = document.querySelector(".completed_tasks_container");
import {savedTasks} from "./form.js";

export function renderTask({taskTitle, taskDesc, state, id}) {

    const node = templateContent.querySelector(".notebook_task");
    const noteBookTask = node.cloneNode(true);
    let todo = savedTasks.find(todo => todo.id === id);

    noteBookTask.querySelector(".title").textContent = taskTitle;
    noteBookTask.querySelector(".description").textContent = taskDesc;
    noteBookTask.setAttribute("data-id", `${id}`);

    noteBookTask.querySelector(".button__delete").addEventListener("click", e => {
        if (todo) {
            todo.state = "deleted";
            noteBookTask.remove()
        }
    })

    noteBookTask.querySelector(".button__done").addEventListener("click", e => {
        if (todo) {
            todo.state = "done";
            noteBookTask.remove()
        }
    })

    noteBookTask.querySelector(".button__add").addEventListener("click", e => {
        if (todo) {
            todo.state = "active";
            noteBookTask.remove()
        }
    })

    switch (state) {
        case "deleted":
            deletedTasksContainer.append(noteBookTask)
            noteBookTask.querySelector(".button__delete").style.display = "none"
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

/*
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
*/










