const notebookNav = document.querySelector('.notebook_menu');
const buttons = notebookNav.querySelectorAll('button');
const navMenuButtons = Array.from(buttons);
let translateValue = 700;
let activeBtn = navMenuButtons[0];

import {notebookTaskContainer, completedTasksContainer, deletedTasksContainer, renderTask} from './render.js';
import {savedTasks} from './form.js';
import {DELETED, ACTIVE, DONE} from './render.js';

export const sliderContainer = document.querySelector('.slider_container');

export function todosFilter(state){
    let todos = savedTasks.filter(item=>item.state===state);
    todos.forEach(renderTask);
}

function removeChildren(container){
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

notebookNav.addEventListener('click', event => {

    const target = event.target;
    const btn = target.closest('.nav_button');

    if (btn && btn !== activeBtn) {
        const index = navMenuButtons.findIndex(it => btn === it);
        activeBtn?.classList.remove('button__underline');
        btn.classList.add('button__underline');
        activeBtn = btn;
        sliderContainer.style.transform = `translateX(-${translateValue * index}px)`;

        if (btn.classList.contains('button__done_tasks')) {
            removeChildren(completedTasksContainer);
            todosFilter(DONE);

        } else if (btn.classList.contains('button__active_tasks')) {
            removeChildren(notebookTaskContainer);
            todosFilter(ACTIVE);

        } else if (btn.classList.contains('button__deleted_tasks')) {
            removeChildren(deletedTasksContainer);
            todosFilter(DELETED);
        }
    }
})

