const gallery = document.getElementById('dog-gallery');

// Fetch data from The Dog API
fetch('https://api.thedogapi.com/v1/breeds', {
  headers: {
    'x-api-key': 'live_DzOViZfAw9WFLi2J9XccwZf9wdryP73FxDyWuua1zbSHmGwbj1wpM73eFc7eUGwv' // Opcional, si tienes una clave de API
  }
})
  .then(response => response.json())
  .then(data => {
    displayDogs(data); // Muestra todas las razas
  })
  .catch(error => console.error('Error fetching data:', error));

// Función para mostrar las razas de perros
function displayDogs(dogs) {
  gallery.innerHTML = ''; // Limpia la galería antes de añadir elementos

  dogs.forEach(dog => {
    // Crear la estructura de cada tarjeta
    const col = document.createElement('div');
    col.classList.add('col-lg-2', 'col-md-4', 'col-sm-6'); // Tamaños de columnas

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

    // Añadir elementos a la tarjeta
    card.appendChild(image);
    card.appendChild(info);
    col.appendChild(card);
    gallery.appendChild(col); // Añadir tarjeta a la galería
  });
}

// Filtrar razas por nombre
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function () {
  const filter = searchInput.value.toLowerCase(); // Convertir texto a minúsculas
  const cards = gallery.getElementsByClassName('dog-card'); // Obtener todas las tarjetas

  // Mostrar u ocultar tarjetas según el filtro
  Array.from(cards).forEach(card => {
    const dogName = card.querySelector('h5').textContent.toLowerCase(); // Obtener el nombre de la raza
    if (dogName.includes(filter)) {
      card.parentElement.style.display = ''; // Mostrar tarjeta
    } else {
      card.parentElement.style.display = 'none'; // Ocultar tarjeta
    }
  });
});
