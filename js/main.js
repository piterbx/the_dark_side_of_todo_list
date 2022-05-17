let $todoInput;
let $todoAddBtn;
let $todoAlert;
let $todoList;
let $todoItemNr=1;
let $todoPopup;
let $todoPopupInput;
let $todoPopupAlert;
let $todoPopupConfirmBtn;
let $todoPopupCloseBtn;
let $todoEdited;
let $todoAllItems;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todo-input');
    $todoAddBtn = document.querySelector('.todo-add-btn');
    $todoAlert = document.querySelector('.todo-alert');
    $todoList = document.querySelector('.todo-list');
    $todoPopup = document.querySelector('.popup');
    $todoPopupInput = document.querySelector('.popup-input');
    $todoPopupAlert = document.querySelector('.popup-alert');
    $todoPopupConfirmBtn = document.querySelector('.popup-confirm-btn');
    $todoPopupCloseBtn = document.querySelector('.popup-cancel-btn');
    $todoAllItems = document.getElementsByClassName('todo-item');
};

const prepareDOMEvents = () => {
    $todoAddBtn.addEventListener('click', addNewTask);
    $todoInput.addEventListener('keyup', listenForKeys);
    $todoList.addEventListener('click', listenForMouseClicks);
    $todoPopupCloseBtn.addEventListener('click', closePopup);
    $todoPopupConfirmBtn.addEventListener('click', editSelectedTask);
    $todoPopupInput.addEventListener('keyup', listenForKeys);
};

const checkInput = () => {
    if($todoInput.value!==''){
        return true;
    }else if($todoPopupInput.value!==''){
        return true;
    } else {
        return false;
    };
};

const createListElement = () => {
    const li = document.createElement('li');
    const liNr = document.createElement('div')
    const liContent = document.createElement('p');
    const liSettings = document.createElement('div');
    const liAcceptBtn = document.createElement('button');
    const liEditBtn = document.createElement('button');
    const liDeleteBtn = document.createElement('button');

    li.setAttribute('id', `todo-item-${$todoItemNr}`);
    li.setAttribute('title', `Note: ${$todoInput.value}`);
    li.classList.add('todo-item');

    liNr.classList.add('todo-item-nr');
    liNr.innerText = $todoItemNr;

    liContent.classList.add('todo-item-content');
    liContent.innerText = $todoInput.value;
    
    liAcceptBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l5 5l10 -10"></path></svg>';
    liEditBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path><line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line></svg>';
    liDeleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    liSettings.classList.add('todo-item-settings');
    liAcceptBtn.classList.add('todo-item-btn', 'accept-btn');
    liEditBtn.classList.add('todo-item-btn', 'edit-btn');
    liDeleteBtn.classList.add('todo-item-btn','delete-btn');

    liSettings.appendChild(liAcceptBtn);
    liSettings.appendChild(liEditBtn);
    liSettings.appendChild(liDeleteBtn);
    li.appendChild(liNr);
    li.appendChild(liContent);
    li.appendChild(liSettings);
    $todoList.appendChild(li);
};

const addNewTask = () => {
    if(checkInput()) {
        createListElement();
        $todoItemNr += 1;
        $todoInput.value = '';
        $todoAlert.innerText = '';
    } else {
        $todoAlert.innerText = 'You have to type some text here!';
    };
};

const selectDoneTask = e => {
    e.target.closest('li').classList.toggle('todo-completed');
};

const openPopup = e => {
    $todoPopup.style.display = 'flex';
    $todoPopup.style.zIndex = 20+'px';
    $todoInput.value = '';

    const id = e.target.closest('li').id;
    $todoEdited = document.querySelector(`#${id} .todo-item-content`);
    $todoPopupInput.value = $todoEdited.textContent;
};

const closePopup = () => {
    $todoPopup.style.display = 'none';
    $todoPopup.style.zIndex = -20+'px';
    $todoPopupInput.value = '';
    $todoPopupAlert.innerText = '';
};

const editSelectedTask = () => {
    if(checkInput()){
        $todoEdited.innerText = $todoPopupInput.value;
        closePopup();
    } else {
        $todoPopupAlert.innerText = 'First, type some text.';
    };
};

const deleteTask = e => {
    const del = e.target.closest('li');
    del.remove();
    if($todoAllItems.length===0){
        $todoAlert.innerText = 'No new notes:/';
    };
};

const listenForKeys = () => {
    if(event.code=='Enter'){
        if($todoPopup.style.display === 'flex'){
            editSelectedTask();
        } else {
            addNewTask();
            $todoPopupInput.value = '';
        };
    } else if(event.code=='Escape'){
        closePopup();
    };
};

const listenForMouseClicks = e => {
    if(e.target.closest('button').className === 'todo-item-btn accept-btn'){
        selectDoneTask(e);
    } else if(e.target.closest('button').className === 'todo-item-btn edit-btn'){
        openPopup(e);
    } else if(e.target.closest('button').className === 'todo-item-btn delete-btn') {
        deleteTask(e);
    };
};

document.addEventListener('DOMContentLoaded', main);