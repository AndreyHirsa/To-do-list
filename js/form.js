const fade = document.querySelector('.popup__fade');
const taskForm = fade.querySelector('.task_form');
const wrongDescription = taskForm.querySelector('.wrong_description');
const wrongName = taskForm.querySelector('.wrong_name');
const buttonClose = taskForm.querySelector('.button__close');
const buttonAddTask = document.querySelector('.button__add');
let timeout = null

import {todosFilter} from "./slider.js";
import {ACTIVE, renderTask} from './render.js';
import {formDisabled, formValidation, nameValidation, descriptionValidation} from './formValidation.js';

export const buttonSubmit = taskForm.querySelector('.button__submit');
export const taskName = document.getElementById('task_name');
export const taskDescription = document.getElementById('task_description');
export let savedTasks = [];

function hideForm() {
    fade.style.display = 'none';
    taskName.value = '';
    taskDescription.value = '';
}

buttonAddTask.addEventListener('click', () => {
    fade.style.display = 'unset';
})

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        hideForm();
    }
});

buttonClose.addEventListener('click', () => {
    hideForm();
})

function wrongNameWarning() {
    clearTimeout(timeout);
    if (!nameValidation()) {
        timeout = setTimeout(function () {
            return wrongName.textContent = `Введите больше 5 символов`;
        }, 1500);
    } else {
        wrongName.textContent = '';
    }
}

function wrongDescriptionWarning() {
    !descriptionValidation() ? wrongDescription.textContent = 'Cлишком длинное описание!' : wrongDescription.textContent = '';
}

taskName.addEventListener('input', event => {
    formValidation();
    wrongNameWarning();
})

taskDescription.addEventListener('input', event => {
    formValidation();
    wrongDescriptionWarning();
})

taskForm.addEventListener('reset', event => {
    formDisabled();
})

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formDisabled();

    const obj = {
        taskTitle: taskName.value,
        taskDesc: taskDescription.value,
        state: 'active',
        id: Math.random().toFixed(5)
    }

    savedTasks.push(obj);
    renderTask(obj);
    hideForm();
})

window.addEventListener('beforeunload', event => {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
})

document.addEventListener('DOMContentLoaded', event => {
    savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    todosFilter(ACTIVE);
})
















