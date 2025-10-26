// ===================================
// navbar
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("navbar");
let menuOpen = false;

    menuBtn.addEventListener("click", () => {
      menuOpen = !menuOpen;
      navLinks.classList.toggle("show");

      if (menuOpen) {
        menuBtn.classList.replace("fa-bars", "fa-xmark");
      } else {
        menuBtn.classList.replace("fa-xmark", "fa-bars");
      }
    });


// ====================================
// footer copyright Year.
document.addEventListener('DOMContentLoaded', function () {
      const el = document.getElementById('year');
      if (el) el.textContent = new Date().getFullYear();
    });

// ======================================
document.getElementById('messageForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const success = document.getElementById('success');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // helper function
  function showError(element, message) {
    element.textContent = message;
    setTimeout(() => { element.textContent = ''; }, 3000);
  }

  let isValid = true;

  if (name.length < 3) {
    showError(nameError, "Name must be at least 3 characters.");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    showError(emailError, "Invalid email format.");
    isValid = false;
  }

  if (subject === '') {
    showError(subjectError, "Subject is required.");
    isValid = false;
  }
  if (message === '') {
    showError(messageError, "Message is required.");
    isValid = false;
  }

  if (isValid) {
    success.textContent = "Message sent successfully.";
    document.getElementById('messageForm').reset();

    setTimeout(() => {
      success.textContent = '';
    }, 3000);
  }
});

// =================================================