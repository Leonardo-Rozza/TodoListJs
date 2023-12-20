import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Pending: "pending",
  Completed: "completed",
};

const state = {
  todos: [
    new Todo("Piedra del Alma"),
    new Todo("Piedra del Infinito"),
    new Todo("Piedra del Poder"),
    new Todo("Piedra del Tiempo"),
    new Todo("Piedra del Realidad "),
  ],
  filter: Filters.All,
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid`);
  }
};

const addTodo = (description) => {
  if (!description) throw new Error(`${description} is not defined`);
  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId); //Regresa todos los TODOS que no coincidan con el ID que nos pasaron por argumento.
  saveStateToLocalStorage();
};

const deleteComplete = () => {
  state.todos = state.todos.filter((todo) => !todo.done); //Se eliminan todos los que esten completados a traves del atributo done.Certficamos que estos mismos esten en true.
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

const initStore = () => {
  loadStore();
  console.log("Init Store!");
  //console.log(state);
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("state")
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

const setFilter = (newFilter = Filters.All) => {
  if (
    newFilter !== Filters.All &&
    newFilter !== Filters.Completed &&
    newFilter !== Filters.Pending
  )
    throw new Error(`${newFilter} is not valid`);
  state.filter = newFilter;
  saveStateToLocalStorage();
};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done; //Invierte el valor bool. del todo que se está recorriendo si este mismo tiene el mismo ID.
    }
    return todo;
  });

  saveStateToLocalStorage();
};

export default {
  addTodo,
  deleteComplete,
  deleteTodo,
  getCurrentFilter,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
  getTodos,
};
