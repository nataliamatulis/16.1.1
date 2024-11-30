const gallery = document.getElementById('dog-gallery');

// Fetch data from The Dog API
fetch('https://api.thedogapi.com/v1/breeds', {
  headers: {
    'x-api-key': 'TU_API_KEY_AQUÍ' // Opcional, si tienes una clave de API
  }
})
  .then(response => response.json())
  .then(data => {
    displayDogs(data);
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to display dog breeds in Bootstrap grid
function displayDogs(dogs) {
  dogs.forEach(dog => {
    const col = document.createElement('div');
    col.classList.add('col-lg-2', 'col-md-4', 'col-sm-6'); // Column sizes

    const card = document.createElement('div');
    card.classList.add('dog-card');

    const image = document.createElement('img');
    image.src = dog.image?.url || 'https://via.placeholder.com/200x200?text=No+Image';
    image.alt = `${dog.name}`;

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `
      <h5>${dog.name}</h5>
      <p>Weight: ${dog.weight.metric} kg</p>
    `;

    card.appendChild(image);
    card.appendChild(info);
    col.appendChild(card);
    gallery.appendChild(col);
  });
}

