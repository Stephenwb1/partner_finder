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
      <p>Height: ${partner.height} cm</p>
      <p>Weight: ${partner.weight} kg</p>
      <p>Distance: ${partner.distance} km</p>
    `;
    container.appendChild(div);
  });
}

});
