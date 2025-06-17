const totoggle = document.getElementById("helsen")
const affected = document.getElementById("droplol")
function toggleani(){
    affected.classList.remove("animatedrop")
    void affected.offsetWidth;
    affected.classList.add("animatedrop")
}
totoggle.addEventListener("click",toggleani)

const totoggle1 = document.getElementById("helse")
const affected1 = document.getElementById("droplo")
function toggleani1(){
    affected1.classList.remove("animatedrop")
    void affected1.offsetWidth;
    affected1.classList.add("animatedrop")
}
totoggle1.addEventListener("click",toggleani1)

const showninput = document.getElementById("join");
const toshow = document.getElementById("searchmo");

showninput.addEventListener("click", () => {
  toshow.style.display = "inline";
  toshow.focus();
});

// Hide the input when it loses focus
toshow.addEventListener("blur", () => {
  toshow.style.display = "none";
});


// Set your API key here
async function GetPopularTMDbTitles() {
  try {
    const apiKey = '185134e7391a581ac86e9efd4a3a4bb3'; // Replace with your TMDb API key
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    for (let i = 0; i < movies.length; i++) {
      const item = movies[i];
      const title = item.title || item.name;
      const year = item.release_date ? item.release_date.split('-')[0] : 'N/A';
      const posterPath = item.poster_path;
      const posterUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

      console.log(`#${i + 1}: ${title}`);
      console.log(`Year: ${year}`);
      console.log(`Poster: ${posterUrl}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

GetPopularTMDbTitles();
