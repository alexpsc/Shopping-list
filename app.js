//selectors

const slInput = document.querySelector(".sl-input");
const slButton = document.querySelector(".sl-button");
const slList = document.querySelector(".sl-list");
const item = document.querySelector(".sl-container");
const sortAsc = document.querySelector(".sort-asc");
const sortDsc = document.querySelector(".sort-dsc");
const filterOption = document.querySelector(".filter-todo");

//event listner
document.addEventListener("DOMContentLoaded", getTodos);
slButton.addEventListener("click", addElem);
slButton.addEventListener("keypress", addElem);
slList.addEventListener("click", markAsCompleted);
item.addEventListener("click", deleteItem);
sortAsc.addEventListener("click", sortUiasc);
sortDsc.addEventListener("click", sortUidesc);
filterOption.addEventListener("click", filterTodo);

//function
function addElem(event) {
  event.preventDefault();

  //create shoping list item
  const shopListItem = document.createElement("tr");
  shopListItem.classList.add("sl");
  //create li
  const newShopItem = document.createElement("td");
  newShopItem.innerText = slInput.value;
  newShopItem.classList.add("sl-item");
  shopListItem.appendChild(newShopItem);
  //mark as buyed button
  if (slInput.value == "") {
    //turn buuton red if input is empty
    document.querySelector("form button").style.color = "red";
    return;
  } else {
    //add to local storage
    saveLocalTodos(slInput.value);

    //turn buuton gree if input is ok
    document.querySelector("form button").style.color = "green";

    const markAsBuyed = document.createElement("button");
    markAsBuyed.innerHTML = '<i class="fas fa-check"></i>';
    markAsBuyed.classList.add("complete-btn");
    shopListItem.append(markAsBuyed);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    shopListItem.appendChild(trashButton);
  }

  slList.appendChild(shopListItem);

  //empty shoping form
  slInput.value = "";
}

function markAsCompleted(e) {
  const item = e.target;

  if (item.classList[0] === "complete-btn") {
    const mark = item.parentElement;
    mark.classList.toggle("completed");
  }
}

function deleteItem(e) {
  const item = e.target;
  console.log(item.classList);

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    console.log(todo);
    todo.classList.add("fall");
    removeLocalTodo(todo);
    //at the end
    // removeLocalTodos(todo);
    todo.addEventListener("transitionend", (e) => {
      todo.remove();
    });
  }
}

function filterTodo(e) {
  const todos = slList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function sortUiasc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".sl-list");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortUidesc() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.querySelector(".sl-list");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function saveLocalTodos(todo) {
  //check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //create shoping list item
    const shopListItem = document.createElement("tr");
    shopListItem.classList.add("sl");
    //create li
    const newShopItem = document.createElement("td");
    newShopItem.innerText = todo;
    newShopItem.classList.add("sl-item");
    shopListItem.appendChild(newShopItem);
    //mark as buyed button

    //turn buuton gree if input is ok
    document.querySelector("form button").style.color = "green";

    const markAsBuyed = document.createElement("button");
    markAsBuyed.innerHTML = '<i class="fas fa-check"></i>';
    markAsBuyed.classList.add("complete-btn");
    shopListItem.append(markAsBuyed);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    shopListItem.appendChild(trashButton);

    slList.appendChild(shopListItem);

    //empty shoping form
    slInput.value = "";
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todos);
  console.log(todoIndex);
  console.log(todos.indexOf("da"));
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
