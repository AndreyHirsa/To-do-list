
const template=document.querySelector(".template_task");
const templateContent=template.content;
const completedTaskContainer=document.querySelector(".completed_tasks_container");
let savedTasks=[];




function renderTask({taskTitle,taskDesc,state,id}){
    const node=templateContent.querySelector(".notebook_task");
    const noteBookTask=node.cloneNode(true);
    noteBookTask.querySelector(".title").textContent=taskTitle;
    noteBookTask.querySelector(".description").textContent=taskDesc;
    noteBookTask.setAttribute("data-id",`${id}`)
    if(state==="deleted"){
        deletedTasksContainer.append(noteBookTask);
        noteBookTask.querySelector(".button__delete").style.display="none";
        noteBookTask.querySelector(".button__done").style.display="none";
    }
    else if (state==="done"){
        completedTaskContainer.append(noteBookTask);
        noteBookTask.querySelector(".button__done").style.display="none";
    }
    else if(state==="active"){
        notebookTaskContainer.append(noteBookTask);
        noteBookTask.querySelector(".button__add").style.display="none";
    }
}


function deleteTodo(id){
    let todo=savedTasks.find(todo=>todo.id===id);
    if(todo){
        todo.state="deleted";
        renderTask(todo);
    }
}



function completeTodo(id){
    let todo=savedTasks.find(todo=>todo.id===id);
    if(todo){
        todo.state="done";
        renderTask(todo);
    }
}

function addTodo(id){
    let todo=savedTasks.find(todo=>todo.id===id);
    if(todo){
        todo.state="active";
        renderTask(todo);
    }
}




sliderContainer.addEventListener("click",event=>{
    let target=event.target;
    let notebookTask=target.closest(".notebook_task");

    if(notebookTask){
        let taskId=notebookTask.getAttribute("data-id");

        if(target.closest(".button__delete")){
            notebookTask.remove()
            deleteTodo(taskId);
        }

        else if(target.closest(".button__done")){
            notebookTask.remove()
            completeTodo(taskId);
        }
        else if(target.closest(".button__add")){
            notebookTask.remove()
            addTodo(taskId);
        }
    }
})



window.addEventListener("beforeunload",event=>{
    localStorage.setItem("tasks",JSON.stringify(savedTasks));
})


document.addEventListener("DOMContentLoaded",event=>{
    if(localStorage.length>0){
        savedTasks=JSON.parse(localStorage.getItem("tasks"));
        savedTasks.forEach(data=>renderTask(data));
    }
})



