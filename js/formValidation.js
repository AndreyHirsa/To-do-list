import {taskDescription, taskName} from "./form.js";

const buttonSubmit = document.querySelector(".button__submit");

export function formDisabled() {
    buttonSubmit.setAttribute("disabled", "disabled");
    buttonSubmit.classList.add("button__disabled");
}

export function formEnabled() {
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.classList.remove("button__disabled");
}

export function nameValidation() {
    return taskName.value.trim().length > 5;
}

export function descriptionValidation() {
    return taskDescription.value.trim().length < 100;
}

export function formValidation() {
    nameValidation() && descriptionValidation() ? formEnabled() : formDisabled();
}
