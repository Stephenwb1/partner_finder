document.addEventListener('DOMContentLoaded', () => {
  // your existing code here
let allPartners = [];
let myself = {};


Promise.all([
  fetch('data/data.json').then(res => res.json()),
  fetch('data/myself.json').then(res => res.json())
]).then(([partnersData, myProfile]) => {
  allPartners = partnersData;
  myself = myProfile;

  const bestMatches = findBestPartners(allPartners, myself);
  renderPartners(bestMatches);
});
function findBestPartners(partners, me) {
  return partners
    // Step 1: Sort by distance (ascending)
    .sort((a, b) => a.distance - b.distance)

    // Step 2: Filter by gender if specified
    .filter(p => !me.gender || p.gender === me.gender)

    // Step 3 & 4: Sort by height and weight similarity
    .sort((a, b) => {
      const heightDiffA = Math.abs(a.height - me.height);
      const heightDiffB = Math.abs(b.height - me.height);

      if (heightDiffA !== heightDiffB) {
        return heightDiffA - heightDiffB;
      }

      const weightDiffA = Math.abs(a.weight - me.weight);
      const weightDiffB = Math.abs(b.weight - me.weight);

      return weightDiffA - weightDiffB;
    })

    // Step 5: Return top 4 matches
    .slice(0, 4);
}

function renderPartners(partners) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  partners.forEach(partner => {
    const div = document.createElement('div');
    div.className = 'partner-card';
    div.innerHTML = `
      <h3>${partner.name}</h3>
      <p>Gender: ${partner.gender}</p>
      <p>Age: ${partner.age}</p>
      <p>Belt Level: ${partner.belt}</p>
      <p>Years of Experience: ${partner.years_training}</p>
      <p>Height: ${partner.height} cm</p>
      <p>Weight: ${partner.weight} lbs</p>
      <p>Location: ${partner.location}</p>
      <p>Distance: ${partner.distance}</p>
    `;
    container.appendChild(div);
  });
}

});

document.getElementById("findBtn").addEventListener("click", () => {
    window.location.href = "results.html"; // Navigate to user input page
});
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
    // do something with person
    console.log(`${person.name} - ${person.gender}`);
  });
}

function sortHeight(userHeight) {
  const sorted = [...peopleData].sort((a, b) => {
    return Math.abs(Number(a.height) - userHeight) - Math.abs(Number(b.height) - userHeight);
  });

  sorted.forEach(person => {
    console.log(`${person.name} - ${person.height} cm (Δ = ${Math.abs(Number(person.height) - userHeight)})`);
  });
}
function sortWeight(userWeight) {
  const sorted = [...peopleData].sort((a, b) => {
    return Math.abs(Number(a.weight) - userWeight) - Math.abs(Number(b.weight) - userWeight);
  });

  sorted.forEach(person => {
    console.log(`${person.name} - ${person.weight} lbs (Δ = ${Math.abs(Number(person.weight) - userWeight)})`);
  });
}
