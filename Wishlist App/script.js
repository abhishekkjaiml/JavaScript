/** Getting all html elements */

const todoInput = document.querySelector(".input");
const todoForm = document.querySelector(".todo-form");
const showTodos = document.querySelector(".todo-container");
const themeToggle = document.getElementById("themeToggle");


/** Getting data from local storage */

let todoList = JSON.parse(localStorage.getItem("wishlist")) || [];


/** Creating function to get unique id */

const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (param) => {
        let number = Math.random() * 16 | 0;
        let randomNumber = param === "x"
            ? number
            : (number & 0x3 | 0x8);

        return randomNumber.toString(16);
    });
};


/** Creating function to save data in local storage */

const saveTodos = () => {
    localStorage.setItem("wishlist", JSON.stringify(todoList));
};


/** Creating function to render wishlist */

const renderTodoList = () => {

    if (todoList.length === 0) {

        showTodos.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-heart"></i>
                <h3>No Wishlist Yet</h3>
                <p>Add your first wishlist item.</p>
            </div>
        `;

        return;
    }

    showTodos.innerHTML = todoList.map(({ id, todo, isCompleted }) => `
    
        <div class="todo-item">

            <input
                id="item-${id}"
                type="checkbox"
                class="todo-checkbox"
                data-key="${id}"
                ${isCompleted ? "checked" : ""}
            >

            <label
                for="item-${id}"
                class="todo-label"
            >
                ${todo}
            </label>

            <button
                class="delete-btn"
                data-delete="${id}"
            >
                Delete
            </button>

        </div>

    `).join("");

};


/** Adding wishlist */

todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const todo = todoInput.value.trim();

    if (todo.length === 0) {

        alert("Please enter your wishlist.");

        return;

    }

    todoList.unshift({

        id: uuid(),

        todo,

        isCompleted: false

    });

    saveTodos();

    renderTodoList();

    todoInput.value = "";

    todoInput.focus();

});


/** Handling checkbox and delete button */

showTodos.addEventListener("click", (e) => {

    let key = e.target.dataset.key;
    let deleteKey = e.target.dataset.delete;

    if (key) {

        todoList = todoList.map((todo) =>

            todo.id === key
                ? { ...todo, isCompleted: !todo.isCompleted }
                : todo

        );

    }

    if (deleteKey) {

        todoList = todoList.filter(

            (todo) => todo.id !== deleteKey

        );

    }

    saveTodos();

    renderTodoList();

});


/** Getting saved theme from local storage */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.innerHTML = `
        <i class="fa-solid fa-sun"></i>
    `;

}


/** Changing theme */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    localStorage.setItem(

        "theme",

        isLight ? "light" : "dark"

    );

    themeToggle.innerHTML = isLight

        ? `<i class="fa-solid fa-sun"></i>`

        : `<i class="fa-solid fa-moon"></i>`;

});


/** Calling render function */

renderTodoList();