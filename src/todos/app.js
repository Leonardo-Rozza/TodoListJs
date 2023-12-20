import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderPending, renderTodos } from "./use-cases";

const ElementIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
  TodoFilers: ".filtro",
  PendignCount: "#pending-count",
};

export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIDs.PendignCount);
  };

  (() => {
    //Cuando la funcion App se llama
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //Referencias HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUl = document.querySelector(ElementIDs.TodoList);
  const clearCompleted = document.querySelector(ElementIDs.ClearCompleted);
  const filtersUL = document.querySelectorAll(ElementIDs.TodoFilers);

  //Listeners
  newDescriptionInput.addEventListener("keyup", (e) => {
    if (e.keyCode !== 13) return; //Solo va a pasar la validacion si el usuario presiona ENTER (code13).
    if (e.target.value.trim().length === 0) return; //Va a acceder solo si el input tiene algun valor.

    todoStore.addTodo(e.target.value); //Enviamos el valor del input a un nuevo TODO.
    displayTodos(); //Llamamos a la funcion que renderiza los TODOS, para que se agreguen a la lista.
    e.target.value = ""; //Reiniciamos el input.
  });

  todoListUl.addEventListener("click", (e) => {
    const element = e.target.closest("[data-id]"); //Busca el elemento padre mas cercano con ese atributo data.
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUl.addEventListener("click", (e) => {
    const element = e.target.closest("[data-id]");
    if (e.target.tagName === "BUTTON") {
      todoStore.deleteTodo(element.getAttribute("data-id"));
      displayTodos();
    }
  });

  clearCompleted.addEventListener("click", () => {
    todoStore.deleteComplete();
    displayTodos();
  });

  filtersUL.forEach((element) => {
    element.addEventListener("click", (e) => {
      filtersUL.forEach((el) => el.classList.remove("selected"));
      e.target.classList.add("selected");

      switch (e.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
