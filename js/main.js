// js/main.js
const app = document.getElementById("app");

// Hold JSON data once it's fetched
let peopleData = [];

// Load data
fetch('data/data.json')
  .then(response => response.json())
  .then(data => {
    peopleData = data;
    // You can call a default sort/render here if needed:
    // sortLocation();
  })
  .catch(error => console.error('Error loading JSON:', error));


app.innerHTML = `
    <h1>JiuJitsu Partner Finder</h1>
    <p>Find nearby sparring partners based on your training level, availability, and location. Train smarter, not alone!</p>
    <button id="findBtn">Find Partners</button>
`;

document.getElementById("findBtn").addEventListener("click", () => {
    window.location.href = "form.html"; // Navigate to user input page
});

function sortLocation() {
  const sorted = [...peopleData].sort((a, b) => Number(a.distance) - Number(b.distance));

  sorted.forEach(person => {
    // do something with person
    console.log(`${person.name} - ${person.distance} km`);
  });
}

 function sortGender(gender) {
  const filtered = peopleData.filter(person => person.gender.toLowerCase() === gender.toLowerCase());

  filtered.forEach(person => {
    console.log(`${person.name} - ${person.gender}`);
  });
}

