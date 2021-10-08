const toDoForm = document.querySelector('#todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('#todo-list');
const todoToggle = document.querySelector('#todo-toggle');
const rightSection = document.querySelector('.right-section');

const TODO_DISPLAY_KEY = 'todoDisplay';
const TODOS_KEY = 'todoList';
const COMPLETE_CLASSNAME = 'complete';
const COMPLETE_FALSE_ICON = '👉';
const COMPLETE_TRUE_ICON = '👍';
const TODO_DEL_ICON = '❌';

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function checkToDo(event) {
    const btn = event.target;
    const li = event.target.parentElement;
    for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].id == li.id) {
            
            toDos[i].complete = !toDos[i].complete;
            if (toDos[i].complete) {
                li.classList.add(COMPLETE_CLASSNAME)
                btn.innerText = COMPLETE_TRUE_ICON;
            } else {
                li.classList.remove(COMPLETE_CLASSNAME)
                btn.innerText = COMPLETE_FALSE_ICON;
            }
        }
    }
    saveToDos();
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();

}
function paintTodoBtn(className, complete ) {    
    const button = document.createElement('button');
    button.classList.add(className)
    if (className == 'del') {
        button.innerText = TODO_DEL_ICON;
    } else {
        if (complete) {
            button.innerText = COMPLETE_TRUE_ICON;
        } else {
            button.innerText = COMPLETE_FALSE_ICON;
        }
    }
    return button;
}

function paintTodo(newTodo){
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    li.id = newTodo.id;
    if (newTodo.complete) {
        li.classList.add(COMPLETE_CLASSNAME);
    }

    const buttonDel = paintTodoBtn('del');
    const buttonCheck = paintTodoBtn('check', newTodo.complete);
    buttonDel.addEventListener('click', deleteToDo)
    buttonCheck.addEventListener('click', checkToDo)
    li.appendChild(buttonCheck);
    li.appendChild(span);
    li.appendChild(buttonDel);

    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = '';
    const newToDoObj = {
        text:newTodo, 
        id: Date.now(),
        complete:false,
    }
    toDos.push(newToDoObj)
    paintTodo(newToDoObj)
    saveToDos();
}


toDoForm.addEventListener('submit', handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintTodo)
}

let todoDisplay;
function todoCheck() {
    let todoDisplayCheck = localStorage.getItem(TODO_DISPLAY_KEY)
    if (todoDisplayCheck !== null && todoDisplayCheck == 'true') {
        todoDisplay = true;
        rightSection.classList.remove(HIDDEN_CLASSNAME)
    } else {
        todoDisplay = false;
        localStorage.setItem(TODO_DISPLAY_KEY, todoDisplay)
    }
}
todoCheck();

function handleTodoToggle() {
    todoDisplay = !todoDisplay
    rightSection.classList.toggle(HIDDEN_CLASSNAME);
    localStorage.setItem(TODO_DISPLAY_KEY, todoDisplay)

}
todoToggle.addEventListener('click', handleTodoToggle)