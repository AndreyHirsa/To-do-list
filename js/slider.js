"use strict"

const notebookNav = document.querySelector(".notebook_menu"),
    currentTasks = document.querySelector(".button__current_tasks"),
    completedTasks = document.querySelector(".button__completed_tasks"),
    deletedTasks = document.querySelector(".button__deleted_tasks"),
    sliderContainer = document.querySelector(".slider_container");


//задаём значение для translate
let translateValue = 500;

//создаём массив из нужных кнопок меню
let navMenuButtons = [currentTasks, completedTasks, deletedTasks];


//меняем класс при клике на кнопки меню и скроллим контейнер
notebookNav.addEventListener("click", event => {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        if (target.className === currentTasks.className) {
            sliderContainer.style.transform = `translateX(0)`
        } else if (target.className === completedTasks.className) {
            sliderContainer.style.transform = `translateX(-${translateValue}px)`;
        } else {
            sliderContainer.style.transform = `translateX(-${translateValue * 2}px)`;
        }
        for (let i of navMenuButtons) {
            i.className === target.className ? i.classList.add("button__underline") : i.classList.remove("button__underline");
        }
    }
})