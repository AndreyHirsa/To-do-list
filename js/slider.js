const notebookNav = document.querySelector(".notebook_menu");
const buttons=notebookNav.querySelectorAll("button");
let  navMenuButtons=Array.from(buttons);
let translateValue = 700;
let activeBtn=navMenuButtons[0];
export const sliderContainer = document.querySelector(".slider_container");

notebookNav.addEventListener("click", event => {
    const target = event.target;
    const btn=target.closest(".nav_button");

    if (btn && btn !== activeBtn) {
        const index = navMenuButtons.findIndex(it => btn === it);
        activeBtn?.classList.remove('button__underline');
        btn.classList.add('button__underline');
        activeBtn = btn;
        sliderContainer.style.transform = `translateX(-${translateValue * index}px)`;
    }
}) 