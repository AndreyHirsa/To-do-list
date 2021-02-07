const template = document.querySelector('.template_task');
const templateContent = template.content;

export const notebookTaskContainer = document.querySelector('.notebook_task_container');
export const deletedTasksContainer = document.querySelector('.notebook_deleted_tasks_container');
export const completedTasksContainer = document.querySelector('.completed_tasks_container');
export const ACTIVE = 'active';
export const DONE = 'done';
export const DELETED = 'deleted';

import {savedTasks} from './form.js';

export function renderTask({taskTitle, taskDesc, state, id}) {

    const node = templateContent.querySelector(".notebook_task");
    const noteBookTask = node.cloneNode(true);
    let todo = savedTasks.find(todo => todo.id === id);
    let todoState=todo.state;

    function removeTodo(state){
        if(todo){
            todoState=state;
            noteBookTask.remove();
        }
    }

    noteBookTask.querySelector('.title').textContent = taskTitle;
    noteBookTask.querySelector('.description').textContent = taskDesc;
    noteBookTask.setAttribute('data-id', `${id}`);

    noteBookTask.querySelector('.button__delete').addEventListener('click', e => {
        removeTodo(DELETED);
    })

    noteBookTask.querySelector('.button__done').addEventListener('click', e => {
        removeTodo(DONE);
    })

    noteBookTask.querySelector('.button__add').addEventListener('click', e => {
        removeTodo(ACTIVE);
    })

    switch (state) {
        case DELETED:
            deletedTasksContainer.append(noteBookTask);
            noteBookTask.querySelector('.button__delete').style.display = 'none';
            noteBookTask.querySelector('.button__done').style.display = 'none';
            break;

        case DONE:
            completedTasksContainer.append(noteBookTask);
            noteBookTask.querySelector('.button__done').style.display = 'none';
            break;

        case ACTIVE:
            notebookTaskContainer.append(noteBookTask);
            noteBookTask.querySelector('.button__add').style.display = 'none';
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










