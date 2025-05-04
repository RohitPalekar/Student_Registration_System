// Fetching data for manipulation
const form = document.getElementById("student-form");
const nameInput = document.getElementById("studentName");
const idInput = document.getElementById("studentClass");
const emailInput = document.getElementById("studentAddress");
const contactInput = document.getElementById("contactNumber");
const tableBody = document.querySelector("#studentsTable tbody");

// variables Declared
let students = [];
let Index = null;

// Load students data from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedStudents = localStorage.getItem("students");
  if (storedStudents) {
    students = JSON.parse(storedStudents);
    Table1();
  }
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const studentId = idInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  // Input validation
  if (!name || !studentId || !email || !contact) {
    alert("Please fill in all fields.");
    return;
  }
  // Validate name (only letters and spaces)
  for (let char of name) {
    if (!(char >= 'A' && char <= 'Z') &&
        !(char >= 'a' && char <= 'z') &&
        char !== ' ') {
      alert("Student Name should contain only letters and spaces.");
      return;
    }
  }
  // Check if studentId is all digits
  if (isNaN(studentId) || studentId.includes(" ")) {
    alert("Student ID should contain only numbers.");
    return;
  }

  // Email validation
  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid Email ID.");
    return;
  }

  // Check if contact is exactly 10 digits and contains only numbers
  if (contact.length !== 10 || isNaN(contact)) {
    alert("Contact No should be exactly 10 digits.");
    return;
  }

  const studentData = {
    name,
    studentId,
    email,
    contact,
  };

  if (Index !== null) {
    students[Index] = studentData;
    Index = null;
  } else {
    students.push(studentData);
  }

  localStorage.setItem("students", JSON.stringify(students));
  Table1();
  form.reset();
});

// Students table data
function Table1() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button class="editit">Edit</button>
        <button class="deleteit">Delete</button>
      </td>
    `;

    // Edit button
    row.querySelector(".editit").addEventListener("click", () => {
      nameInput.value = student.name;
      idInput.value = student.studentId;
      emailInput.value = student.email;
      contactInput.value = student.contact;
      Index = index;
    });

    // Delete button
    row.querySelector(".deleteit").addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        Table1();
      }
    });

    tableBody.appendChild(row);
  });
}
