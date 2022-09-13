
let todoInput = document.querySelector('#inputTodo');
let Form = document.querySelector('#form');
let todoSelect = document.querySelector('#select');
let todoContainer = document.querySelector('#toDoListContainer');
let body = document.querySelector('body');
let RadioButton = document.querySelectorAll('[name="flexRadioDefault"]');
let modal = document.querySelector('.popup');
let content = document.querySelector('.popup-content');
let category = 'All';
let todoList = [];
let filterList;
let Colormap = { Done: 'red', 'On Test': 'blue', Pending: 'yellow' };

Form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (todoInput.value) {
        let value = todoInput.value;
        Add(value);
        todoInput.value = "";
    }
});
function Add(value) {
    let todo = { value: value, category: todoSelect.value, id: Math.floor((Math.random() * 99999)) };
    todoList.push(todo);
    if (category !== 'All' && category !== todoSelect.value) return false;
    todoContainer.insertAdjacentHTML("Afterbegin", `<li class="item" data-id="${todo.id}">${todo.value} <span class="${Colormap[todo.category]}">${todo.category}</span><button class="span-status remove-button">Sil</button><button class="span-status edit-button">Düzenle</button></li>`);
    Delete();
    Edit();
}
function Delete() {
    let deleteButton = document.querySelector('.remove-button');
    deleteButton.addEventListener('click', event => {
        event.target.parentNode.remove();
        let id = event.target.parentNode.getAttribute('data-id');
        let index = todoList.findIndex(todo => todo.id == id);
        todoList.splice(index, 1);
    });
}
function filterDelete() {
    let deleteButton = document.querySelectorAll('.remove-button');
    deleteButton.forEach(function (element) {
        element.addEventListener('click', event => {
            event.target.parentNode.remove();
            let id = event.target.parentNode.getAttribute('data-id');
            let index = todoList.findIndex(todo => todo.id == id);
            todoList.splice(index, 1);
        });
    });
}
RadioButton.forEach(function (element) {
    element.addEventListener('change', function (event) {
        category = event.target.value;
        Filter(category);
    })
})
function Filter(category) {
    category !== 'All' ? filterList = todoList.filter(todo => todo.category === category) : filterList = todoList;
    todoContainer.innerHTML = '';
    filterList.forEach(function (todo) {
        todoContainer.insertAdjacentHTML("Afterbegin", `<li class="item"  data-id="${todo.id}">${todo.value} <span class="${Colormap[todo.category]}">${todo.category}</span><button class="span-status remove-button">Sil</button><button class="span-status edit-button">Düzenle</button></li>`);
    }); filterDelete();
    Edit();
}
function Edit() {
    let editButton = document.querySelectorAll('.edit-button');
    editButton.forEach(function (element) {
        element.addEventListener('click', function (event) {
            let id = event.target.parentNode.getAttribute('data-id');
            let index = todoList.findIndex(todo => todo.id == id);
            let todo = todoList[index];
            modal.classList.toggle('show');
            content.innerHTML = '';
            content.insertAdjacentHTML('afterBegin', `<div class="item"  data-id="${todo.id}"><input class="todo-value" value="${todo.value}"/><button class="span-status save-button">Kaydet</button> </div>`)
            Save(index);
        });
    });
}
function Save(index) {
    let savebutton = document.querySelector('.save-button');
    savebutton.addEventListener('click', function (event) {
        let todovalue = event.target.parentNode.firstChild.value;
        todoList[index].value = todovalue;
        Filter(category);
        modal.classList.remove('show');

    });
}
