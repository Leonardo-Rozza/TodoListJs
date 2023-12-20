/**
 *
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("A TODO object is required");

  const { description, done, id } = todo;
  const html = `
                <div class="view">
                    <input class="toggle" type="checkbox" ${
                      done ? "checked" : ""
                    }>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
              `;

  const litItem = document.createElement("li");
  litItem.innerHTML = html;

  //Le cambiamos el id, por el uuid que creamos
  litItem.setAttribute("data-id", id);

  //Comprobamos si la tarea está completa y le colocamos la clase correspondiente.
  if (todo.done) litItem.classList.add("completed");

  return litItem;
};
