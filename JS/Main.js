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

const lookouttable = {};
const genreval = [];

async function fetchGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US');
    const genredata = await res.json();
    genredata.genres.forEach(g => lookouttable[g.id] = g.name);
    genreval.push(genredata);
    console.log(genredata);
}
fetchGenres();

const returnvalues = [];

async function GetPopularTMDbTitles() {
    try {
        const apiKey = '185134e7391a581ac86e9efd4a3a4bb3';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        const ratings = movies[5].overview;

        console.log(ratings);
        console.log(ratings * 10);
        console.log(Math.floor(ratings * 10) + "%");
        console.log(movies);
        console.log(movies[1].title);

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

        returnvalues.push(...movies);
        const maincard = document.getElementsByClassName("thecontent-popular");

        for (let j = 0; j < popupbutton.length; j++) {
            const contento = movies[j];
            const PosterPath1 = contento.poster_path;
            const posterUrl1 = PosterPath1
                ? `https://image.tmdb.org/t/p/original${PosterPath1}`
                : 'https://via.placeholder.com/300x450?text=No+Image';

            let showbuts = popupbutton[j];
            showbuts.addEventListener("click", (event) => {});
        }

        const posterPath = movies[0].poster_path;
        const fullPosterUrl = posterPath
            ? `https://image.tmdb.org/t/p/original${posterPath}`
            : 'https://via.placeholder.com/300x450?text=No+Image';

        document.getElementById("containall").style.backgroundImage = `url('${fullPosterUrl}')`;
        document.getElementById("thefirst_title").innerHTML = movies[0].title;

    } catch (error) {
        console.error('An error has occoured:', error);
    }
}
GetPopularTMDbTitles();

const givetrailer = [];
console.log(givetrailer);

const housinten = [];
const pushresult = [];

document.addEventListener("DOMContentLoaded", function namedfunq() {
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
            const theintended = returnvalues[index].id;
            housinten.push(theintended);

            async function getvidtrailers() {
                await GetPopularTMDbTitles();
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${returnvalues[index].id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`);
                    const viddata = await response.json();
                    givetrailer.push(viddata);
                    console.log(viddata);
                    console.log(viddata.results[0]);
                    console.log("+++++++++");

                    setTimeout(() => {
                        const embedkey = givetrailer[index]?.results?.[0]?.key;
                        const iframe = popup.querySelector("#trailerpark");
                        iframe.src = `https://www.youtube.com/embed/${embedkey}?autoplay=1&mute=1`;
                    }, 500);

                } catch (error) {
                    console.log("An error has occoured" + error);
                }
            }
            getvidtrailers();

            popup.innerHTML = `
        <div class="thecontent" tabindex="0">
        <div class= "containpost">
        <iframe class="trailervidi" id = "trailerpark" src="" allowfullscreen ></iframe>
          </div>
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

            const thegenres = returnvalues[index].genre_ids;
            const namedgenres = thegenres.map(id => lookouttable[id]);
            console.log(namedgenres);

            document.body.appendChild(popup);
            currentPopup = popup;

            const thegenlist = document.querySelector(".contenttag_popularlist");
            thegenlist.innerHTML = "";
            namedgenres.forEach(hosting => {
                const listing = document.createElement("li");
                listing.innerHTML = hosting;
                thegenlist.appendChild(listing);
            });

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



async function gettingactioncontent() {
    try{
    const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"
    const Action_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=28,12`)
    const Action_Shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=10759`)
    
    
    
    
    // const Action_Shows_epi = 


    const clearAction_Shows = await Action_Shows.json()

    clearAction_Shows.results.forEach(e => {

        async function trying() {
          try{
    const Action_Shows_epi = await fetch(`https://api.themoviedb.org/3/tv/${e.id}?api_key=${APIkey}`)
    const ClearAction_Shows_epi = Action_Shows_epi.json()
    console.log(ClearAction_Shows_epi)
    //  console.log(Action_Shows_epi)   

          }
           catch (error) {
        console.error('An error has occoured:', error);
    }  
        }
        trying()
    });

    console.log(clearAction_Shows)




}
 catch (error) {
        console.error('An error has occoured:', error);
    }
}
gettingactioncontent()