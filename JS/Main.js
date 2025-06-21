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

function popupfunction(){

}



async function GetPopularTMDbTitles() {
  try {
    const apiKey = '185134e7391a581ac86e9efd4a3a4bb3';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    console.log(movies)
    for (let i = 0; i < movies.length; i++) {
      const content = movies[i];
      const title = content.title || content.name;
      const year = content.release_date ? content.release_date.split('-')[0] : 'N/A';
      const describtion = content.overview
      const PosterPath = content.poster_path;
      const posterUrl = PosterPath
        ? `https://image.tmdb.org/t/p/w500${PosterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

      console.log(`#${i + 1}: ${title}`);
      console.log(`Year: ${year}`);
      console.log('---');
      console.log(`describtion: ${describtion}`);
      console.log(`Poster: ${PosterPath}`)
      
      const posterPath = movies[0].poster_path;
      const fullPosterUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : 'https://via.placeholder.com/300x450?text=No+Image';

      document.getElementById("containall").style.backgroundImage = `url('${fullPosterUrl}')`;
      document.getElementById("thefirst_title").innerHTML = movies[0].title
      document.getElementById("thefirst_describtion").innerHTML = movies[0].overview
    }
    const popularposters = document.getElementsByClassName("Cardposter_popular")

    // const
for (let i = 0; i < movies.length && i < popularposters.length; i++) {
  const posterPath = movies[i].poster_path;
  const posterUrl = posterPath
  // const populardescribtion = movies[i].overview
  // const 
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  popularposters[i].src = posterUrl;
}
  } catch (error) {
    console.error('Error fetching data:', error);
  }
    

}
GetPopularTMDbTitles();
// document.getElementById("containall").style.backgroundimage="url(../Images/Movie5-21_jump_street.jfif)";

// todo : add list items to your content cards using code from the task list project and add the genres to it
