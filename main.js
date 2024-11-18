const students = [];
let currentEditingIndex = null;

const searchInput = document.getElementById("searchInput");
const groupFilter = document.getElementById("groupFilter");
const studentTableBody = document.getElementById("studentTableBody");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentModal = document.getElementById("studentModal");
const closeModal = document.getElementById("closeModal");
const studentForm = document.getElementById("studentForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const groupInput = document.getElementById("group");
const doesWorkInput = document.getElementById("doesWork");

function renderTable() {
  studentTableBody.innerHTML = "";

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchInput.value.toLowerCase()) || 
                          student.lastName.toLowerCase().includes(searchInput.value.toLowerCase());
    const matchesGroup = groupFilter.value === "All" || student.group === groupFilter.value;

    return matchesSearch && matchesGroup;
  });

  filteredStudents.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.group}</td>
      <td>${student.doesWork ? "Yes" : "No"}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})" style="background-color: red;">Delete</button>
      </td>
    `;
    studentTableBody.appendChild(row);
  });
}

function addStudent(event) {
  event.preventDefault();

  const newStudent = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    group: groupInput.value,
    doesWork: doesWorkInput.checked,
  };

  if (currentEditingIndex !== null) {
    students[currentEditingIndex] = newStudent;
    currentEditingIndex = null;
  } else {
    students.push(newStudent);
  }

  renderTable();
  studentModal.style.display = "none";
  studentForm.reset();
}

function editStudent(index) {
  currentEditingIndex = index;

  const student = students[index];
  firstNameInput.value = student.firstName;
  lastNameInput.value = student.lastName;
  groupInput.value = student.group;
  doesWorkInput.checked = student.doesWork;

  studentModal.style.display = "flex";
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}

addStudentBtn.addEventListener("click", () => {
  studentModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  studentModal.style.display = "none";
  studentForm.reset();
  currentEditingIndex = null;
});

studentForm.addEventListener("submit", addStudent);
searchInput.addEventListener("input", renderTable);
groupFilter.addEventListener("change", renderTable);

renderTable();
