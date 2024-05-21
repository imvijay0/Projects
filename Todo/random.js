const todoList = [
  {
    name: 'make dinner',
    dueDate: '2023-4-5',
  },
  {
    name: 'eat lunch',
    dueDate: '2024-4-5',
  },
];
renderTodoList();
function renderTodoList() {
  let todoHtml = ``;

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // const name = todoObject.name;
    // const dueDate = todoObject.dueDate;

    const {name,dueDate} = todoObject;

    const html = `
    
    <div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
      todoList.splice(${i},1);
      renderTodoList();
    " class="delete-button" >Delete</button>
  
    `;
    todoHtml += html;
  }
  document.querySelector('.todo-list').innerHTML = todoHtml;
}

function addTodo() {
  const inputElement = document.querySelector('.input-element');
  const dateInputElement = document.querySelector('.due-date-input');


  const name = inputElement.value;
  const dueDate = dateInputElement.value;


  todoList.push(
    {
      // name: name,
      // dueDate: dueDate
      name,
      dueDate
    }
  );

  renderTodoList();

  inputElement.value = '';
  dateInputElement.value = '';
}
