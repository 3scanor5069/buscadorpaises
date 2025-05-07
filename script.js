// script.js - Buscador de países con comentarios detallados

// Obtenemos los elementos del DOM (HTML)
const input = document.getElementById("searchInput"); // Campo de texto
const resultsContainer = document.getElementById("results"); // Contenedor de resultados

// Escuchamos el evento 'input' (cuando el usuario escribe algo)
input.addEventListener("input", async function () {
  const query = input.value.trim(); // Eliminamos espacios al principio/final

  // Si el campo está vacío, limpiamos resultados
  if (query.length === 0) {
    resultsContainer.innerHTML = "";
    return;
  }

  try {
    // Llamada a la API REST Countries con el nombre del país
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);

    // Si la respuesta no fue exitosa (404, etc.)
    if (!response.ok) {
      resultsContainer.innerHTML = "<p>No se encontraron países.</p>";
      return;
    }

    // Convertimos la respuesta en JSON
    const countries = await response.json();

    // Mostramos los resultados en la pantalla
    showResults(countries);
  } catch (error) {
    // Si algo falla (API caída, sin internet, etc.)
    console.error("Error al buscar países:", error);
    resultsContainer.innerHTML = "<p>Error al cargar los países.</p>";
  }
});

// Función para mostrar los resultados
function showResults(countries) {
  // Limpiamos los resultados anteriores
  resultsContainer.innerHTML = "";

  // Iteramos sobre cada país devuelto
  countries.forEach((country) => {
    // Creamos un div para mostrar los datos del país
    const div = document.createElement("div");
    div.classList.add("country"); // Clase para estilos TRON

    // Contenido del país (nombre, capital, población y bandera)
    div.innerHTML = `
      <strong>${country.name.common}</strong><br/>
      Capital: ${country.capital ? country.capital[0] : "No disponible"}<br/>
      Población: ${country.population.toLocaleString()}<br/>
      <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" />
    `;

    // Añadimos el país al contenedor de resultados
    resultsContainer.appendChild(div);
  });
}
