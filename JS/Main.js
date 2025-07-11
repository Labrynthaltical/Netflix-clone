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

const returnvalues = []

async function GetPopularTMDbTitles() {
    try {
        const apiKey = '185134e7391a581ac86e9efd4a3a4bb3';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
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
        for(let i = 0; i <maincard.length; i++){
          maincard[i].addEventListener("focus",() => {
            console.log("clicked")
            let titled = document.getElementsByClassName("contentname")
          }
        )
                }
        for (let j = 0; j < popupbutton.length; j++) {
            const contento = movies[j];
            const PosterPath1 = contento.poster_path;
            const posterUrl1 = PosterPath1
                ? `https://image.tmdb.org/t/p/original${PosterPath1}`
                : 'https://via.placeholder.com/300x450?text=No+Image';

            let showbuts = popupbutton[j];
            let titles = movies[j].title || movies[j].name;
            let thebowl = document.getElementById("popupcontain");
           returnvalues.push(titles)
            console.log(titles)

            showbuts.addEventListener("click", (event) => {

            });
        }

        const posterPath = movies[0].poster_path;
        const fullPosterUrl = posterPath
            ? `https://image.tmdb.org/t/p/original${posterPath}`
            : 'https://via.placeholder.com/300x450?text=No+Image';

        document.getElementById("first_movie").style.backgroundImage = `url('${fullPosterUrl}')`;
        document.getElementById("thefirst_title").innerHTML = movies[0].title;
        document.getElementById("thefirst_describtion").innerHTML = movies[0].overview;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

GetPopularTMDbTitles()

document.addEventListener("DOMContentLoaded", () => {
  let currentPopup = null;
  let popupRemovalTimeout = null;

  document.querySelectorAll('.thecontent-popular').forEach((el, index) => {
    el.addEventListener('focusin', () => {
      if (popupRemovalTimeout) {
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
      const genreTags = Array.from(el.querySelectorAll(".contenttag_popular"))
        .filter(li => li.textContent.trim() !== "")
        .map(li => `<li class="contenttag_popular">${li.textContent}</li>`)
        .join("");

      popup.innerHTML = `
        <div class="thecontent" tabindex="0">
          <img class="Cardposter_popular" src="${posterSrc}">
          <div class="contentdetails">
            <div class="moviebuttons">
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
              <div class="containbutton showmore"><button class="displaymore" ><i class="fa-solid fa-chevron-down"></i></button></div>
            </div>
            <div class="contentstats">
              <p class="contentname">${movieTitle}</p>
              <p class="contentmatch">75.54% Match</p>
              <ul class="contenttag_popularlist">${genreTags}</ul>
            </div>
          </div>
        </div>`;

      document.body.appendChild(popup);
      currentPopup = popup;

      const rect = el.getBoundingClientRect();
      popup.style.top = `${rect.top + window.scrollY}px`;
      popup.style.left = `${rect.left + window.scrollX}px`;
      // popup.style.display = 'inline';
      
      // popup.style.position = "absolute"

      const moreButton = popup.querySelector(".displaymore");
      if (moreButton) {
        moreButton.addEventListener("click", (e) => {
          e.preventDefault();
          
          popup.classList.add("helphereplz");

          // popup.scrollIntoView()
          // let anotherpop = document.createElement("div")
          // document.getElementById("allbutpop").appendChild(anotherpop)

          // anotherpop.classList.add("testme")

          // anotherpop.id = "tripale"
        });
      }
    });

    document.getElementById("allbutpop").addEventListener("click", () => {
      document.querySelectorAll(".popup-sim").forEach(e => {
        e.remove()
      });
    })

  });
});
// 

// let bigpop = document.getElementById("tripale")
// bigpop.addEventListener("click", () => {
//   console.log("ayyyy")
// })
console.log(returnvalues)
console.log("------------------------")
console.log(returnvalues[0])
