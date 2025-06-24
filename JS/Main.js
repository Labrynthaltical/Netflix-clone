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

toshow.addEventListener("blur", () => {
  toshow.style.display = "none";
});

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
    const popupcover = document.getElementsByClassName("popup-div_popular")
    const popularposters = document.getElementsByClassName("Cardposter_popular")
    const popularposterspop = document.getElementsByClassName("Cardposter_popular-popup")
    const popupbutton = document.getElementsByClassName("displaymore")
    // for(let j = 0; j < popupbutton.length;j++)
for (let i = 0; i < movies.length && i < popularposters.length; i++) {
  const posterPath = movies[i].poster_path;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  popularposters[i].src = posterUrl;
// popupcover[i].style.backgroundImage = `url('${posterUrl}')`;
}
for (let j = 0; j < popupbutton.length; j++) {
        // const posterUrl = PosterPath
        // ? `https://image.tmdb.org/t/p/w500${PosterPath}`
        // : 'https://via.placeholder.com/300x450?text=No+Image';
  const contento = movies[j]
  const PosterPath1 = contento.poster_path;
  const posterUrl1 = PosterPath1
      ? `https://image.tmdb.org/t/p/w500${PosterPath1}`
    : 'https://via.placeholder.com/300x450?text=No+Image';
  console.log(PosterPath1)
  console.log(posterUrl1)
  let showbuts = popupbutton[j];
  let thebowl = document.getElementById("popupcontain")
  showbuts.addEventListener("click", () => {
  console.log("testing");
    console.log(contento)

  let popcontain = document.createElement("div")
  popcontain.classList.add("popup-div_popular")
  thebowl.appendChild(popcontain)
  popcontain.style.display = "block"
  popcontain.style.backgroundImage = `url('${posterUrl1}')`
  // popcontain.style.backgroundImage = `url('${posterUrl[j]}')`
  });
}

// return([response,url,response,data,movies,content,title,year,describtion,PosterPath,posterUrl])
  } catch (error) {
    console.error('Error fetching data:', error);
  }
    

}
GetPopularTMDbTitles();
// document.getElementById("containall").style.backgroundimage="url(../Images/Movie5-21_jump_street.jfif)";

// todo : add list items to your content cards using code from the task list project and add the genres to it

// todo : finish the popup div

// todo : add popup divs just like the first task 