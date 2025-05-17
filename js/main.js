// js/main.js
const app = document.getElementById("app");

app.innerHTML = `
    <h1>JiuJitsu Partner Finder</h1>
    <p>Find nearby sparring partners based on your training level, availability, and location. Train smarter, not alone!</p>
    <button id="findBtn">Find Partners</button>
`;

document.getElementById("findBtn").addEventListener("click", () => {
    window.location.href = "form.html"; // Navigate to user input page
});
