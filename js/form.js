const form = document.getElementById("userForm");

// Load saved data and pre-fill form
window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("userData");
  if (savedData) {
    const userData = JSON.parse(savedData);
    for (const [key, value] of Object.entries(userData)) {
      const input = form.elements.namedItem(key);
      if (input) {
        input.value = value;
      }
    }
  }
});

// Save form data to localStorage on submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent actual form submission

  const formData = new FormData(form);
  const dataObj = {};

  for (const [key, value] of formData.entries()) {
    dataObj[key] = value;
  }

  localStorage.setItem("userData", JSON.stringify(dataObj));

  alert("Your data has been saved locally!");
});
