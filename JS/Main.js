
  const currentUser = document.getElementById("wantedone");
  const userOptions = document.querySelectorAll("#droplo .userli");

  userOptions.forEach(e => {
    e.addEventListener("click", () => {
      currentUser.innerHTML = e.innerHTML;  // replace summary content
      document.getElementById("helse").open = false; // close dropdown
    });
  });


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
    const res_movies = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US');
    const genredata = await res_movies.json();
    const res_shows = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`);
    const genrodata = await res_shows.json();
    [...genredata.genres,...genrodata.genres].forEach(g => lookouttable[g.id] = g.name);
    genreval.push(genredata.genres,genrodata.genres);
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
    displayit = null
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
            const content_title = returnvalues[index]?.title || "Untitled";
            const theintended = returnvalues[index].id;
            housinten.push(theintended);

            async function getvidtrailers() {
                await GetPopularTMDbTitles();
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${returnvalues[index].id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`);
                    const viddata = await response.json();
                    console.log(viddata)
                    console.log(viddata.results[0].key)
                    console.log("5555555555555555555555")
   
                    let thekeyed = viddata.results[0].key
                    console.log(thekeyed)
                    const embedkey = viddata.results[0].key
                    console.log(embedkey)
                    const theiframe = document.querySelector("iframe")
                    theiframe.src = `https://www.youtube.com/embed/${embedkey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
                } catch (error) {
                    console.log("An error has occoured" + error);
                }
            }
            getvidtrailers();
            popup.innerHTML = `
        <div class="thecontent" tabindex="0">
        <div id = "postedon" class= "containpost">
        <img id = "tryme" src = "${posterSrc}">
            <iframe class="trailervidi" id = "trailerpark"   controls=0" src="" allowfullscreen ></iframe>
          </div>
          <div class="contentdetails">
            <div class="moviebuttons">
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
              <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
              <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
            </div>
            <div class="contentstats">
              <p class="contentname">${content_title}</p>
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
 const style = document.createElement("style");
            style.textContent = `@keyframes movePopup_${Date.now()} {
        from {
            top: ${rect.top }px;
            left: ${rect.left + window.scrollX}px;
        }
        to {
            top: ${35}%;
            left: ${35}%;
 
        }
    }`
    document.head.appendChild(style);
    popup.style.position = "fixed";
    popup.style.animation = `movePopup_${Date.now()} 0.35s ease-out forwards`;
            // popup.style.top = `${rect.top + window.scrollY}px`;
            // popup.style.left = `${rect.left + window.scrollX}px`;
            // Make an animation and apply it here with ${} for bounding client
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
// const isMobileMQ = window.matchMedia("(max-width: 760px)");

                    setTimeout(() => {
                        popup.classList.add("deletmoi");
                        // document.body.classList.add('noscroll');

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









    const Export_fun_scoping = []
    const pushmerge = []
    const Trailer_action = []
async function Gettingactioncontent() {

    try{
    const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"
    const Action_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=28,12`)
    const Action_Shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=10759`)
    const clearAction_Shows = await Action_Shows.json()
    const clearAction_Movies = await Action_movies.json()



    Export_fun_scoping.push(clearAction_Movies)
    Export_fun_scoping.push(clearAction_Shows)
    
   
    function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
     const mergedstuff = [...clearAction_Movies.results,...clearAction_Shows.results];
shuffle(mergedstuff)
    const clearAction_Movies_results = clearAction_Movies.results
    const description_Action = clearAction_Movies_results[2].overview
    pushmerge.push(mergedstuff)
    const popupcover = document.getElementsByClassName("popup-div_popular");
    const actionposters = document.getElementsByClassName("Cardposter-action");
    const popupbutton = document.getElementsByClassName("displaymore");

         for (let i = 0; i < mergedstuff.length && i < actionposters.length; i++) {
             const posterPath = mergedstuff[i].poster_path || mergedstuff[i].backdrop_path;
             const posterUrl = posterPath
                 ? `https://image.tmdb.org/t/p/original${posterPath}`
                 : 'https://via.placeholder.com/300x450?text=No+Image';
             actionposters[i].src = posterUrl;
         }


}
 catch (error) {
        console.error('An error has occoured:', error);
    }
}
Gettingactioncontent()

document.addEventListener("DOMContentLoaded", function namedfunq() {
    let currentPopup = null;
    let popupRemovalTimeout = null;

    document.querySelectorAll('.thecontent-action').forEach((el, index) => {
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

            const posterSrc = el.querySelector(".Cardposter-action")?.src || '../Images/placeholder.jpg';
            const content_title = pushmerge[0][index].title || pushmerge[0][index].name|| "Untitled";
            // const theintended = Export_fun_scoping[index].id;
            // housinten.push(theintended);

           async function getvidtrailers_action() {
    try {
        const theitem = pushmerge[0][index];
            const type = theitem.title ? "movie" : "tv"
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${theitem.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`);
        const viddata_action = await response.json();
        console.log(viddata_action);
        console.log(viddata_action.results[0].key);
        console.log("5555555555555555555555");

        let thekeyed = viddata_action.results[0].key;
        console.log(thekeyed);
        const embedkey = viddata_action.results[0].key;
        console.log(embedkey);

        const theiframe = document.querySelector("iframe");
        theiframe.src = `https://www.youtube.com/embed/${embedkey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
    } catch (error) {
        console.error("An error has occoured:", error);
    }
}
getvidtrailers_action();

    console.log(pushmerge[0][0])
    console.log("item:", index, pushmerge[0][index]);

            if(!pushmerge[0][index].original_name){
            popup.innerHTML = `
        <div class="thecontent" tabindex="0">
        <div class= "containpost">
        <img id = "tryme" src = "${posterSrc}">
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
              <p class="contentname">${content_title}</p>
              <ul class="contenttag_action"></ul>
            <p class="content_discribtion">${pushmerge[0][index].overview || "No description available"}</p>
            </div>
          </div>
        </div>`;
            }
            else{
            popup.innerHTML = `
        <div class="thecontent" tabindex="0">
        <div class= "containpost">
        <img id = "tryme" src = "${posterSrc}">
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
              <p class="contentname">${content_title}</p>
              <ul class="contenttag_action"></ul>
            <p class="content_discribtion">${pushmerge[0][index].overview || "No description available"}</p>
            </div>
          </div>
        </div>`;  
            }
            const thegenres = pushmerge[0][index].genre_ids;
            const namedgenres = thegenres.map(id => lookouttable[id]);
            console.log(namedgenres);

            document.body.appendChild(popup);
            currentPopup = popup;

            const thegenlist = document.querySelector(".contenttag_action");
            thegenlist.innerHTML = "";
            namedgenres.forEach(hosting => {
                const listing = document.createElement("li");
                listing.innerHTML = hosting;
                thegenlist.appendChild(listing);
            });

            const rect = el.getBoundingClientRect();
            console.log(rect)
           const style = document.createElement("style");
            style.textContent = `@keyframes movePopup_${Date.now()} {
        from {
            top: ${rect.top }px;
            left: ${rect.left + window.scrollX}px;
        }
        to {
            top: ${35}%;
            left: ${35}%;
 
        }
    }`
    document.head.appendChild(style);
    popup.style.position = "fixed";
    popup.style.animation = `movePopup_${Date.now()} 0.35s ease-out forwards`;
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

// Instead of fetching all data for all seasons and episodes of TV shows,fetch them only when they are needed to be displayed


    // clearAction_Shows.results.forEach(e => {
        // async function trying() {
        //   try{
    // const Action_Shows_epi = await fetch(`https://api.themoviedb.org/3/tv/${e.id}?api_key=${APIkey}`)
    // const ClearAction_Shows_epi = await Action_Shows_epi.json()
    // console.log(ClearAction_Shows_epi)
    // console.log("++++++++++++++++++++++")
    // console.log(ClearAction_Shows_epi.name)
    // Export_fun_scoping.push(ClearAction_Shows_epi)
        //   }
        //    catch (error) {
        // console.error('An error has occoured:', error);
    // }  
        // }
        // trying()
    // });
const Export_fun_gems = []
const pushmerge_gems = []
const Trailer_gems = []

async function GettingHiddengemcontent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"
        const Hiddengem_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&sort_by=vote_average.desc&vote_count.lte=500`)
        const Hiddengem_shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&sort_by=vote_average.desc&vote_count.lte=500`)
        const Clear_Hiddengem_movies = await Hiddengem_movies.json()
        const Clear_Hiddengem_shows = await Hiddengem_shows.json()

        Export_fun_gems.push(Clear_Hiddengem_movies)
        Export_fun_gems.push(Clear_Hiddengem_shows)

        const merged_gems = [...Clear_Hiddengem_movies.results, ...Clear_Hiddengem_shows.results]

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
        }
        shuffle(merged_gems)

        pushmerge_gems.push(merged_gems)

        const gemposters = document.getElementsByClassName("Cardposter-gems")

        for (let i = 0; i < merged_gems.length && i < gemposters.length; i++) {
            const posterPath = merged_gems[i].poster_path || merged_gems[i].backdrop_path;
            const posterUrl = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : 'https://via.placeholder.com/300x450?text=No+Image';
            gemposters[i].src = posterUrl;
        }

    } catch (error) {
        console.error('An error has occoured:', error);
    }
}
GettingHiddengemcontent()
document.addEventListener("DOMContentLoaded", function namedfunq() {
    let currentPopup = null;
    let popupRemovalTimeout = null;

    document.querySelectorAll('.thecontent-gems').forEach((el, index) => {
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

            const posterSrc = el.querySelector(".Cardposter-gems")?.src || '../Images/placeholder.jpg';
            const content_title = pushmerge_gems[0][index].title || pushmerge_gems[0][index].name || "Untitled";

            async function getvidtrailers_gems() {
                try {
                    const item = pushmerge_gems[0][index]
                    const type = item.title ? "movie" : "tv"

                    const response = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`)
                    const viddata = await response.json()

                    const embedkey = viddata.results[0]?.key
                    if (embedkey) {
                        const theiframe = document.querySelector("iframe")
                        theiframe.src = `https://www.youtube.com/embed/${embedkey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
                    }
                } catch (error) {
                    console.error("An error has occoured:", error);
                }
            }
            getvidtrailers_gems()

            popup.innerHTML = `
            <div class="thecontent" tabindex="0">
                <div class="containpost">
                    <img id="tryme" src="${posterSrc}">
                    <iframe class="trailervidi" id="trailerpark" src="" allowfullscreen></iframe>
                </div>
                <div class="contentdetails">
                    <div class="moviebuttons">
                        <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
                        <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
                        <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
                        <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
                    </div>
                    <div class="contentstats">
                        <p class="contentname">${content_title}</p>
                        <ul class="contenttag_gems"></ul>
                        <p class="content_discribtion">${pushmerge_gems[0][index].overview || "No description available"}</p>
                    </div>
                </div>
            </div>`;

            const thegenres = pushmerge_gems[0][index].genre_ids;
            const namedgenres = thegenres.map(id => lookouttable[id]);

            document.body.appendChild(popup);
            currentPopup = popup;

            const thegenlist = document.querySelector(".contenttag_gems");
            thegenlist.innerHTML = "";
            namedgenres.forEach(hosting => {
                const listing = document.createElement("li");
                listing.innerHTML = hosting;
                thegenlist.appendChild(listing);
            });

            const rect = el.getBoundingClientRect();
            const style = document.createElement("style");
            style.textContent = `@keyframes movePopup_${Date.now()} {
                from {
                    top: ${rect.top}px;
                    left: ${rect.left + window.scrollX}px;
                }
                to {
                    top: ${35}%;
                    left: ${35}%;
                }
            }`
            document.head.appendChild(style);
            popup.style.position = "fixed";
            popup.style.animation = `movePopup_${Date.now()} 0.35s ease-out forwards`;

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

        el.addEventListener('focusout', () => {
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

    console.log("GORP")
    console.log("========================================================================================")
// Make the episode list and work on adding more genres