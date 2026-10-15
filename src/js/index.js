// Функція для отримання всіх студентів
const studentInfo = document.querySelector(".student");
const tbody = document.querySelector("#body");
function getStudents() {
  const url = "http://localhost:4829/students";
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Помилка: ${response.statusText}`);
      }
      return response.json();
    })
    .then((studentsAll) => {
      renderStudents(studentsAll);
    })
    .catch((err) => console.error(err));
}
getStudents().then((student) => console.log(student));
// Функція для відображення студентів у таблиці

function renderStudents(students) {
  tbody.innerHTML = ``;
  students.forEach((student) => {
    const info = `
    <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
           <td>${student.age} років</td>
      <td>${student.course}</td>
      <td>${student.skils}</td>
      <td>${student.email}</td>
      <td>${student.status}</td>
      // <td>${student.actions}</td>

 
      <td>
        <button class="delete-btn" data-id="${student.id}">Видалити</button>
      </td>
      </tr>
    `;

    tbody.insertAdjacentHTML("beforeend", info);
  });
}

// Функція для додавання нового студента

// function addStudent(e) {
//   // твій код
// }

// Функція для оновлення студента

// function updateStudent(id) {
//   // твій код
// }

// Функція для видалення студента

function deleteStudent(id) {
  const url = `http://localhost:4829/students/${id}`;
  return fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => console.error(err));
}

const deleteBtn = document.querySelector(".delete-btn");

const handleRemoveStudent = (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.dataset.id;

    deleteStudent(id).then((data) => console.log(data));
  }
};
tbody.addEventListener("click", handleRemoveStudent);
