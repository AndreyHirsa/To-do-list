"use strict"

const notebookNav = document.querySelector(".notebook_menu");
const sliderContainer = document.querySelector(".slider_container");
const buttons=notebookNav.querySelectorAll("button");
let  navMenuButtons=Array.from(buttons);
let translateValue = 700;


notebookNav.addEventListener("click", event => {
    const target = event.target
    if (target.closest("button")) {
       for(let btn of navMenuButtons){
           target===btn?btn.classList.add("button__underline"):btn.classList.remove("button__underline");
       }
        sliderContainer.style.transform = `translateX(-${translateValue * navMenuButtons.indexOf(target)}px)`
    }
})