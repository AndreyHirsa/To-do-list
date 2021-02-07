const notebookNav = document.querySelector('.notebook_menu');
const buttons = notebookNav.querySelectorAll('button');
const navMenuButtons = Array.from(buttons);
let translateValue = 700;
let activeBtn = navMenuButtons[0];

import {notebookTaskContainer, completedTasksContainer, deletedTasksContainer, renderTask} from './render.js';
import {savedTasks} from './form.js';
import {DELETED, ACTIVE, DONE} from './render.js';

export const sliderContainer = document.querySelector('.slider_container');

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
            const todos = savedTasks.filter(item => item.state === DONE);
            while (completedTasksContainer.firstChild) {
                completedTasksContainer.firstChild.remove();
            }
            todos.forEach(renderTask);

        } else if (btn.classList.contains('button__active_tasks')) {
            const todos = savedTasks.filter(item => item.state === ACTIVE);
            while (notebookTaskContainer.firstChild) {
                notebookTaskContainer.firstChild.remove();
            }
            todos.forEach(renderTask);

        } else if (btn.classList.contains('button__deleted_tasks')) {
            const todos = savedTasks.filter(item => item.state === DELETED);
            while (deletedTasksContainer.firstChild) {
                deletedTasksContainer.firstChild.remove();
            }
            todos.forEach(renderTask);
        }
    }
})

