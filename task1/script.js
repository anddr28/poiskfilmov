const API_KEY = 'ff3ff250';

const form = document.getElementById('searchForm');
const results = document.getElementById('results');
const details = document.getElementById('details');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(title)}&type=${type}`
    );

    const data = await response.json();

    results.innerHTML = '';
    details.innerHTML = '';

    if (data.Response === 'False') {
        results.innerHTML = '<p>Movie not found!</p>';
        return;
    }

    data.Search.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie';

        div.innerHTML = `
            <img src="${movie.Poster}" alt="poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="loadDetails('${movie.imdbID}')">
                Details
            </button>
        `;

        results.appendChild(div);
    });
});

async function loadDetails(id) {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );

    const movie = await response.json();

    details.innerHTML = `
        <h2>${movie.Title}</h2>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Country:</strong> ${movie.Country}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Awards:</strong> ${movie.Awards}</p>
    `;
}