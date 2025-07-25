const totoggle = document.getElementById("helsen");
const affected = document.getElementById("droplol");

function toggleani() {
    affected.classList.remove("animatedrop");
    void affected.offsetWidth;
    affected.classList.add("animatedrop");
}
totoggle.addEventListener("click", toggleani);

const totoggle1 = document.getElementById("helse");
const affected1 = document.getElementById("droplo");

function toggleani1() {
    affected1.classList.remove("animatedrop");
    void affected1.offsetWidth;
    affected1.classList.add("animatedrop");
}
totoggle1.addEventListener("click", toggleani1);

const showninput = document.getElementById("join");
const toshow = document.getElementById("searchmo");

showninput.addEventListener("click", () => {
    toshow.style.display = "inline";
    toshow.focus();
});

toshow.addEventListener("blur", () => {
    toshow.style.display = "none";
});
const lookouttable = {}

  const genreval = []
async function fetchGenres() {
  const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US');
  const genredata = await res.json();
  genredata.genres.forEach(g => lookouttable[g.id] = g.name);
  genreval.push(genredata)
  console.log(genredata)
}
fetchGenres()
// console.log(genreval);



const returnvalues = []



async function GetPopularTMDbTitles() {
    try {
        const apiKey = '185134e7391a581ac86e9efd4a3a4bb3';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        const ratings = movies[5].overview;
        // const tooverview = movies.overview
        // console.log(ratings)
        // console.log(movies.id[0])
        console.log(ratings)
        console.log(ratings * 10)
        console.log(Math.floor(ratings * 10) + "%")
        console.log(movies)
        console.log(movies[1].title)
        const popupcover = document.getElementsByClassName("popup-div_popular");
        const popularposters = document.getElementsByClassName("Cardposter_popular");
        const popupbutton = document.getElementsByClassName("displaymore");
        for (let i = 0; i < movies.length && i < popularposters.length; i++) {
            const posterPath = movies[i].poster_path;
            const posterUrl = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : 'https://via.placeholder.com/300x450?text=No+Image';

            popularposters[i].src = posterUrl;
        }
        returnvalues.push(...movies)
        const maincard = document.getElementsByClassName("thecontent-popular")

        for (let j = 0; j < popupbutton.length; j++) {
            const contento = movies[j];
            const PosterPath1 = contento.poster_path;
            const posterUrl1 = PosterPath1
                ? `https://image.tmdb.org/t/p/original${PosterPath1}`
                : 'https://via.placeholder.com/300x450?text=No+Image';

            let showbuts = popupbutton[j];
            // let titles = movies[j].title || movies[j].name;
            // let thebowl = document.getElementById("popupcontain");
            // console.log(titles)

            showbuts.addEventListener("click", (event) => {
            });
        }

        const posterPath = movies[0].poster_path;
        const fullPosterUrl = posterPath
            ? `https://image.tmdb.org/t/p/original${posterPath}`
            : 'https://via.placeholder.com/300x450?text=No+Image';

        document.getElementById("containall").style.backgroundImage = `url('${fullPosterUrl}')`;
        document.getElementById("thefirst_title").innerHTML = movies[0].title;
        // document.getElementById("thefirst_describtion").innerHTML = movies[0].overview;

    } catch (error) {
        console.error('An error has occoured:', error);
    }
}

GetPopularTMDbTitles()


async function getvidtrailers(){
  try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${1087192}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`);
    const data = await response.json();
    console.log(data);
  }
  catch (error){
    console.log("An error has occoured" + error)
  }
}
getvidtrailers()






document.addEventListener("DOMContentLoaded", () => {
  let currentPopup = null;
  let popupRemovalTimeout = null;

  document.querySelectorAll('.thecontent-popular').forEach((el, index) => {
    el.addEventListener('focusin', () => {
      if (popupRemovalTimeout) {
        clearTimeout(popupRemovalTimeout);
        popupRemovalTimeout = null;
      }

      if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
      }

      const popup = document.createElement('div');
      popup.classList.add('popup-sim');
      popup.setAttribute('tabindex', '-1'); 

      const posterSrc = el.querySelector(".Cardposter_popular")?.src || '../Images/placeholder.jpg';
      const movieTitle = returnvalues[index]?.title || "Untitled";
      // for(let i = 0; i < returnvalues.)
      



      popup.innerHTML = `
        <div class="thecontent" tabindex="0">
          <img class="Cardposter_popular" src="${posterSrc}">
          <div class="contentdetails">
            <div class="moviebuttons">
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
              <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
            </div>
            <div class="contentstats">
              <p class="contentname">${movieTitle}</p>
              <ul class="contenttag_popularlist"></ul>
            <p class="content_discribtion">${returnvalues[index]?.overview || "No description available"}</p>
            </div>
          </div>
        </div>`;
      const thegenres = returnvalues[index].genre_ids
      const namedgenres = thegenres.map(id => lookouttable[id]);
      console.log(namedgenres)
      document.body.appendChild(popup);
      currentPopup = popup;
      const thegenlist = document.querySelector(".contenttag_popularlist")
      thegenlist.innerHTML = ""
      namedgenres.forEach(hosting => {
        const listing = document.createElement("li")
        listing.innerHTML = hosting
        thegenlist.appendChild(listing)
      })
      const rect = el.getBoundingClientRect();
      popup.style.top = `${rect.top + window.scrollY}px`;
      popup.style.left = `${rect.left + window.scrollX - 40}px`;

      let problem = document.querySelectorAll(".popup-sim");
      if (problem) {
        problem.forEach(e => {
          e.addEventListener("focusout", () => {
            e.remove();
          });
        });
      }

      const moreButton = popup.querySelector(".displaymore");
      if (moreButton) {
        moreButton.addEventListener("click", (e) => {
          e.preventDefault();
          popup.style.top = "";
          popup.style.left = "";
          popup.style.position = "";
          popup.classList.remove("popup-sim");

          popup.classList.add("helphereplz");

          setTimeout(() => {
            popup.classList.add("deletmoi");
            document.body.classList.add('noscroll');

            popup.addEventListener("focusout", () => {
              document.body.classList.remove('noscroll');
              popup.remove();
            });
          }, 100);
        });
      }
    });

    document.getElementById("allbutpop").addEventListener("click", () => {
      document.querySelectorAll(".deletmoi").forEach(e => {
        e.remove();
        document.body.classList.remove('noscroll');
      });
    });

    el.addEventListener('focusout', (e) => {
      popupRemovalTimeout = setTimeout(() => {
        const focused = document.activeElement;
        if (currentPopup && (!currentPopup.contains(focused))) {
          currentPopup.remove();
          currentPopup = null;
        }
      }, 150);
    });
  });
});