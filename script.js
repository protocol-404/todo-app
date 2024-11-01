const form = document.getElementById("taskForm");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");
const tableHeader = document.getElementById("tableHeader");
let rowEdit = null;

toggleFormBtn.addEventListener("click", function () {
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});

addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const dueDate = document.getElementById("taskDate").value;
  const status = document.getElementById("taskStatus").value;

  if (title && dueDate) {
    const row = rowEdit || todoList.insertRow();
    row.innerHTML = `
                    <td>${title}</td>
                    <td>${description || "-"}</td>
                    <td>${new Date(dueDate).toLocaleDateString()}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm edit-btn">Edit</button>
                        <button class="btn btn-outline-danger btn-sm delete-btn">Delete</button>
                    </td>
                `;

    tableHeader.style.display = "table-header-group";

    row.querySelector(".edit-btn").addEventListener("click", () => editTask(row));
    row.querySelector(".delete-btn").addEventListener("click", () => deleteTask(row));

    form.reset();
    rowEdit = null;
    addTaskBtn.textContent = "Add Task";
  }
});

function editTask(row) {
  const cells = row.children;

  document.getElementById("taskTitle").value = cells[0].textContent;
  if (cells[1].textContent === "-") {
    document.getElementById("taskDescription").value = "";
  } else {
    document.getElementById("taskDescription").value = cells[1].textContent;
  }

  const taskDateCell = new Date(cells[2].textContent);
  if (taskDateCell) {
    document.getElementById("taskDate").value = taskDateCell.toISOString().split("T")[0];
  } else {
    document.getElementById("taskDate").value = "";
  }

  const taskStatusCell = cells[3].textContent;
  if (taskStatusCell) {
    document.getElementById("taskStatus").value = taskStatusCell;
  } else {
    document.getElementById("taskStatus").value = "";
  }

  rowEdit = row;
  addTaskBtn.textContent = "Edit Task";
}

function deleteTask(row) {
  row.remove();

  if (todoList.children.length === 0) {
    tableHeader.style.display = "none";
  }

  form.reset();
  rowEdit = null;
  addTaskBtn.textContent = "Add Task";
}