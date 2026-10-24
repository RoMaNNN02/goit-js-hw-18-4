import studentTemplate from "bundle-text:../template/students.hbs?raw";
import Handlebars from "handlebars";

const template = Handlebars.compile(studentTemplate);
// const studentInfo = document.querySelector(".student");

const tbody = document.querySelector("#body");
const form = document.querySelector("#add-student-form");
const addButton = document.querySelector(".addButton");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const courseInput = document.querySelector("#course");
const skillsInput = document.querySelector("#skills");
async function getStudents() {
  const url = "http://localhost:4829/students";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Помилка: ${response.statusText}`);
  }
  return await response.json();
}
getStudents();
// Функція для відображення студентів у таблиці

function renderStudents(students) {
  // tbody.innerHTML = ``;
  // students.forEach((student) => {
  //   const info = `
  //   <tr>
  //     <td>${student.id}</td>
  //     <td>${student.name}</td>
  //     <td>${student.age} років</td>
  //     <td>${student.course}</td>
  //     <td>${student.skills}</td>
  //     <td>${student.email}</td>
  //     <td>${student.status}</td>
  //  // <td>${student.actions}</td>

  //     <td>
  //       <button class="delete-btn" data-id="${student.id}">Видалити</button>
  //     </td>
  //     </tr>
  //   `;
  const template = Handlebars.compile(studentTemplate);
  const markup = students.map((student) => template(student)).join("");
  tbody.insertAdjacentHTML("beforeend", markup);
  // });
}
renderStudents();
// Функція для додавання нового студента

async function addStudent(e) {
  const url = "http://localhost:4829/students";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.statusText}`);
  }
  return await response.json();
}
const handleAddStudent = () => {
  addStudent({
    id: form.length + 1,
    name: nameInput.value,
    age: ageInput.value,
    course: courseInput.value,
    skills: skillsInput.value,
    email: emailInput.value,
  }).then((student) => console.log(student));
};
addButton.addEventListener("click", handleAddStudent);

// Функція для оновлення студента

async function updateStudent(id) {
  const url = `http://localhost:4829/students/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.statusText}`);
  }
}

// Функція для видалення студента

async function deleteStudent(id) {
  const url = `http://localhost:4829/students/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
}

// const deleteBtn = document.querySelector(".delete-btn");

const handleRemoveStudent = (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.dataset.id;

    deleteStudent(id).then((data) => console.log(data));
  }
};
tbody.addEventListener("click", handleRemoveStudent);
