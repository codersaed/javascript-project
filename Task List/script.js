let form = document.querySelector("#task_form");
let taskList = document.querySelector("ul");
let taskInput = document.querySelector("#new_task");
let clearTask = document.querySelector("#clear_task");
let taskFilter = document.querySelector("#task_filter");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeList);
clearTask.addEventListener("click", clearItem);
taskFilter.addEventListener("click", filterTask);
document.addEventListener("DOMContentLoaded", getTask);

function addTask(e) {
  if (taskInput.value === "") {
    alert("please type input");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskLocalStorage(taskInput.value);

    taskInput.value = "";
  }
  e.preventDefault();
}

function removeList(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are You Sure")) {
      let ele = e.target.parentElement;
      ele.remove();

      removeFromLs(ele);
    }
  }
}

function clearItem() {
  taskList.innerHTML = "";

  localStorage.clear();
}

function filterTask(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeFromLs(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
