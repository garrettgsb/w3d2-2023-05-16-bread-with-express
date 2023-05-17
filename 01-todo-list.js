const todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(newText) {
  todos.push(newText);
}

function deleteTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(Number(idx), 1);
}

function editTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function browseTodos() {
  return `
  <h1>Todos:</h1>
  <ul>
  ${todos.map((todo, idx) => `
    <li>
      ${todo} [${idx}]
      <form method='POST' action='/todos/${idx}'>
        <input name='newTodoText'>
        <button>🖋</button>
      </form>
      <form method='POST' action='/todos/${idx}/delete'>
      <button>🚮</button>
      </form>
    </li>
  `).join('\n')}
  </ul>
  <form method='POST' action='/todos'>
    <input name='newTodoText'>
    <button>➕</button>
  </form>
  `;
}

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => { response.send(browseTodos()) });
app.post('/todos/:id', (request, response) => {
  const id = request.params.id;
  const newTodoText = request.body.newTodoText;
  editTodo(id, newTodoText);
  response.redirect('/');
});

app.post('/todos/:id/delete', (request, response) => { deleteTodo(request.params.id); response.redirect('/') });
app.post('/todos', (request, response) => {
  const newTodoText = request.body.newTodoText;
  addTodo(newTodoText);
  response.redirect('/');
});
app.listen(8080);
