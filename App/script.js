const todoTitleEl = document.getElementById('todo-title');
const todoDescEl = document.getElementById('todo-desc');
const addTodoBtn = document.getElementById('addTodo');
const clearTodoBtn = document.getElementById('clearTodo');
const todoTableEl = document.getElementById('todoTable');
const editTodoEl = document.getElementById('editTodo');
const currentDateEl = new Date();

function addTodo() {
    const title = todoTitleEl.value;
    const desc = todoDescEl.value;
    const  options = {weekday: 'long', year:'numeric', month: 'long', day: 'numeric'};

    const currentDate = currentDateEl.toDateString(undefined, options);

    if ((title && desc) == ''){
        todoTitleEl.style.borderBottomColor = 'red';
        todoDescEl.style.borderColor = 'red';
    }else {

        if(localStorage.getItem('todoList') == null){
            todoListJsonArray = [];
            todoListJsonArray.push([todoTitleEl.value, todoDescEl.value, currentDate]);
            localStorage.setItem('todoList', JSON.stringify(todoListJsonArray));
        }else {
            todoListJsonArrayStr = localStorage.getItem('todoList');
            todoListJsonArray = JSON.parse(todoListJsonArrayStr);
            todoListJsonArray.push([todoTitleEl.value, todoDescEl.value, currentDate]);
            localStorage.setItem('todoList', JSON.stringify(todoListJsonArray));
        }
    }

    addTodoInTable();
    clear();

}

function addTodoInTable() {

    if(localStorage.getItem('todoList') == null){
        todoListJsonArray = [];
        localStorage.setItem('todoList', JSON.stringify(todoListJsonArray));
    }else {
        todoListJsonArrayStr = localStorage.getItem('todoList');
        todoListJsonArray = JSON.parse(todoListJsonArrayStr);
    }

    let str = '';
    todoListJsonArray.forEach((element, index) => {

        str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><span>${element[2]}</span></td>
                <td><buttton class="btn editBtn" onclick="editTodo(${index})">Edit</buttton></td>
                <td><buttton class="btn delBtn" onclick="removeTodo(${index})">Remove</buttton></td>
            </tr>
        `;
    });
    todoTableEl.innerHTML = str;  
    
}

addTodoBtn.addEventListener('click', addTodo);
clearTodoBtn.addEventListener('click', clear);
addTodoInTable();


function editTodo(itemIndex) {

    editTodoEl.classList.remove('hidden');
    editTodoEl.innerHTML = `
        <div class="edit">
            <textarea  class="edit-desc" placeholder="Edit Description" ></textarea><br>
            <button class="btn editTodoBtn">Edit Todo</button>
        </div>
    `;

    const editTodoBtnEl = editTodoEl.querySelector('.editTodoBtn');
    const editDescText = editTodoEl.querySelector('.edit-desc');
    const edit = editTodoEl.querySelector('.edit-desc');

    editTodoBtnEl.addEventListener('click', () => {

        console.log(itemIndex);
        console.log(editDescText.value);
        todoListJsonArrayStr = localStorage.getItem('todoList');
        todoListJsonArray = JSON.parse(todoListJsonArrayStr);
        todoListJsonArray[itemIndex][1] = editDescText.value;
        localStorage.setItem('todoList', JSON.stringify(todoListJsonArray));
        addTodoInTable();

        editTodoEl.classList.add('hidden');
    });

}


function removeTodo(itemIndex) {
    console.log(itemIndex);
    todoListJsonArrayStr = localStorage.getItem('todoList');
    todoListJsonArray = JSON.parse(todoListJsonArrayStr);
    todoListJsonArray.splice(itemIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoListJsonArray));
    addTodoInTable();
}

function clear() {
    todoTitleEl.value = '';
    todoDescEl.value = '';
}




