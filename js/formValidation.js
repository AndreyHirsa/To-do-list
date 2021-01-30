const wrongDescription = document.querySelector(".wrong_description");
const wrongName = document.querySelector(".wrong_name");
const buttonSubmit = document.querySelector(".button__submit");
export const taskName = document.getElementById("task_name");
export const taskDescription = document.getElementById("task_description");
let timeout = null;

export function formDisabled() {
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.classList.add("button__disabled");
}

export function formEnabled() {
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.classList.remove("button__disabled");
}

function nameValidation() {
    return taskName.value.trim().length > 5;
}

function descriptionValidation() {
    return taskDescription.value.trim().length < 100;
}

export function formValidation() {
    nameValidation() && descriptionValidation() ? formEnabled() : formDisabled();
}

taskName.addEventListener('input', event => {
    formValidation();
    clearTimeout(timeout);
    if (!nameValidation()) {
        timeout = setTimeout(function () {
            return wrongName.textContent = `Введите больше 5 символов`;
        }, 1500);
    } else {
        wrongName.textContent = "";
    }
})

taskDescription.addEventListener('input', event => {
    formValidation();
    !descriptionValidation() ? wrongDescription.textContent = "Cлишком длинное описание!" : wrongDescription.textContent = "";
})
