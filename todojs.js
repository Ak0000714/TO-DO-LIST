document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.querySelector('form');
    const todoInput = document.getElementById('todo-input');
    const todolist = document.getElementById('list');

    let alltodos = gettodos();
    updateTodoList();

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addtodo();
    });

    function addtodo() {
        const todotext = todoInput.value;
        if (todotext.length > 0) {
            const todoobject = {
                text: todotext,
                completed: false
            };
            alltodos.push(todoobject);
            updateTodoList();
            savetodos();
            todoInput.value = "";
        }
    }

    function updateTodoList() {
        todolist.innerHTML = "";
        alltodos.forEach((todo, todoindex) => {
            const todoitem = createTodoItem(todo, todoindex);
            todolist.append(todoitem);
        });
    }

    function createTodoItem(todo, todoIndex) {
        const todoId = "todo-" + todoIndex;
        const todoli = document.createElement("li");
        const todoText = todo.text;
        todoli.className = "todo";
        todoli.innerHTML = `
            <input type="checkbox" id="${todoId}">
            <label class="custom-checkbox" for="${todoId}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </label>
            <label for="${todoId}" class="todo-text"> ${todoText}</label>
            <button class="delete-button">
                <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
        `;
        const deletebutton = todoli.querySelector(".delete-button");
        deletebutton.addEventListener("click", () => {
            deleteTodoItem(todoIndex);
        });
        const checkbox = todoli.querySelector("input");
        checkbox.addEventListener("change", () => {
            alltodos[todoIndex].completed = checkbox.checked;
            savetodos();
        });
        checkbox.checked = todo.completed;
        return todoli;
    }

    function deleteTodoItem(todoIndex) {
        alltodos = alltodos.filter((_, i) => i !== todoIndex);
        savetodos();
        updateTodoList();
    }

    function savetodos() {
        const todojson = JSON.stringify(alltodos);
        localStorage.setItem("todos", todojson);
    }

    function gettodos() {
        const todos = localStorage.getItem("todos") || "[]";
        return JSON.parse(todos);
    }
});
