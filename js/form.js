"use strict"


const buttonAddTask = document.querySelector(".button__add"),
    taskForm = document.querySelector(".task_form"),
    fade = document.querySelector(".popup__fade"),
    buttonClose = document.querySelector(".button__close"),
    warning = document.querySelectorAll(".warning"),
    buttonSubmit = document.querySelector(".button__submit"),
    taskName = document.getElementById("task_name"),
    taskDescription = document.getElementById("task_description"),
    notebookTaskContainer = document.querySelector(".notebook_task_container");

//динамическая нумерация задач
function numbering(taskContainer) {
    let container = taskContainer.children

    let number = 0;
    for (let i = 0; i < container.length; i++) {
        if (container[i].nodeName === "DIV") {
            let task = container[i].children;
            for (let i = 0; i < task.length; i++) {
                if (task[i].className === "notebook_task_number") {
                    task[i].textContent = `${number + 1}`;
                    number++;
                }
            }
        }
    }
}

//так как задачи пока не сохраняются в localstorage, добавляем нумерацию для первого элемента
numbering(notebookTaskContainer);

//открываем форму
buttonAddTask.addEventListener("click", () => {
    taskForm.style.display = "flex";
    fade.style.display = "unset";
})


//закрываем форму по ESC
document.addEventListener('keydown', event => {
    if (event.keyCode === 27) {
        taskForm.style.display = "none";
        fade.style.display = "none";
    }
});

//закрываем форму по крестику-кнопке
buttonClose.addEventListener("click", () => {
    taskForm.style.display = "none";
    fade.style.display = "none";
})

//добавляем кнопке отправки формы атрибут и класс disabled по умолчанию
buttonSubmit.setAttribute("disabled", "disabled");
buttonSubmit.classList.add("button__disabled");

//функция для проверерки параметров инпутов для валидации
function checkParams() {
    if (taskName.value.trim().length > 5 && taskDescription.value.trim().length < 100) {
        buttonSubmit.removeAttribute("disabled");
        buttonSubmit.classList.remove("button__disabled");
    } else {
        buttonSubmit.setAttribute("disabled", "disabled");
        buttonSubmit.classList.add("button__disabled");
    }
}

//валидация названия задачи
let timeout = null;

taskName.addEventListener('input', event => {
    checkParams()
    clearTimeout(timeout);
    if (taskName.value.trim().length < 6) {
        timeout = setTimeout(function () {
            return warning[0].textContent = `Введите больше 5 символов`;
        }, 1500);
    } else {
        warning[0].textContent = "";
    }
})

//валидация описания задачи
taskDescription.addEventListener('input', event => {
    checkParams();
    if (taskDescription.value.trim().length > 99) {
        warning[1].textContent = "Cлишком длинное описание!";

    } else {
        warning[1].textContent = "";
    }
})

//создаём новую задачу при отправке(пока не дошёл до шаблона)
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newTask = document.createElement("div");
    newTask.className = "notebook_task";
    notebookTaskContainer.append(newTask);

    let newTaskNumberDiv = document.createElement("div");
    newTaskNumberDiv.className = "notebook_task_number";
    newTask.append(newTaskNumberDiv);

    let newTaskNumberSpan = document.createElement("span");
    newTaskNumberSpan.className = "number";
    newTaskNumberDiv.append(newTaskNumberSpan);

    let newTaskDescription = document.createElement("div");
    newTaskDescription.className = "notebook_task_description";
    newTask.append(newTaskDescription);

    let newTaskTitle = document.createElement("h2");
    newTaskTitle.className = "title";
    newTaskDescription.append(newTaskTitle);

    let titleContent = taskName.value.trim();
    newTaskTitle.textContent = titleContent[0].toUpperCase() + titleContent.slice(1);

    let newDescription = document.createElement("p");
    newDescription.className = "description";

    //проверяем, вводил ли пользователь описание
    if (taskDescription.value) {
        let descriptionContent = taskDescription.value.trim();
        newDescription.textContent = descriptionContent[0].toUpperCase() + descriptionContent.slice(1);
    }
    newTaskDescription.append(newDescription);

    let buttonContainer = document.createElement("div");
    buttonContainer.className = "notebook_task_button_container";
    newTask.append(buttonContainer);

    let buttonDone = document.createElement("button");
    buttonDone.className = "button__done";
    buttonContainer.append(buttonDone);

    let buttonDoneImage = document.createElement("i");
    buttonDoneImage.className = "fas fa-check";
    buttonDone.append(buttonDoneImage);

    let buttonDelete = document.createElement("button");
    buttonDelete.className = "button__delete";
    buttonContainer.append(buttonDelete);

    let buttonDeleteImage = document.createElement("i");
    buttonDeleteImage.className = "fas fa-times";
    buttonDelete.append(buttonDeleteImage);

    //блокируем кнопку отправки(может стоит сделать 2 функции на блокировку и обратно?)
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.classList.add("button__disabled");

    //убираем значения в инпутах
    taskName.value = "";
    taskDescription.value = "";

    //пересчитываем нумерацию задач
    numbering(notebookTaskContainer);
})


const completedTasksContainer = document.querySelector(".completed_tasks_container");
const deletedTasksContainer = document.querySelector(".notebook_deleted_tasks_container");

//перемещаем задачу в удалённые и пересчитываем нумерацию
sliderContainer.addEventListener("click", event => {

    let target = event.target;

    if (target.className === "fas fa-times") {
        deletedTasksContainer.append(target.closest('.notebook_task'));
        numbering(notebookTaskContainer);
        numbering(deletedTasksContainer);
        numbering(completedTasksContainer);
    }
})




//перемещаем задачу в выполненные и пересчитываем нумерацию
sliderContainer.addEventListener("click", event => {

    let target = event.target;

    if (target.className === "fas fa-check") {
        completedTasksContainer.append(target.closest('.notebook_task'));
        numbering(notebookTaskContainer);
        numbering(completedTasksContainer);
        numbering(deletedTasksContainer);
    }
})




