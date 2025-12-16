
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

let cachedRegion = null;
let cachedCountryName = null;

async function getUserRegion() {
    if (cachedRegion) return cachedRegion;

    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        cachedRegion =
            data.country_code ||
            Intl.DateTimeFormat().resolvedOptions().locale?.split("-")[1] ||
            navigator.language?.split("-")[1] ||
            "US";

        return cachedRegion;
    } catch {
        cachedRegion =
            Intl.DateTimeFormat().resolvedOptions().locale?.split("-")[1] ||
            navigator.language?.split("-")[1] ||
            "US";

        return cachedRegion;
    }
}

function getCountryName(code) {
    if (cachedCountryName) return cachedCountryName;

    cachedCountryName = new Intl.DisplayNames(
        [navigator.language || "en"],
        { type: "region" }
    ).of(code);

    return cachedCountryName;
}

async function GetPopularTMDbTitles() {
    try {
        const apiKey = '185134e7391a581ac86e9efd4a3a4bb3';

        const regionCode = await getUserRegion();      // "US"
        const countryName = getCountryName(regionCode); // "United States"

        console.log(regionCode, countryName);
        console.log( countryName);
        document.getElementById("setit").innerHTML = `Top 10 movies in the country of ${countryName} today!`
        const moviesRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&region=${regionCode}`);
        const showsRes = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1&region=${regionCode}`);
        const moviesData = await moviesRes.json();
        const showsData = await showsRes.json();
        const mergedContent = [
            ...moviesData.results,
            ...showsData.results
        ].filter(item => item.poster_path || item.backdrop_path);

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex !== 0) {
                const randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] =
                    [array[randomIndex], array[currentIndex]];
            }
        }

        shuffle(mergedContent);
        returnvalues.push(...mergedContent);

        const popularposters = document.getElementsByClassName("Cardposter_popular");

        for (let i = 0; i < mergedContent.length && i < popularposters.length; i++) {
            const posterPath = mergedContent[i].poster_path || mergedContent[i].backdrop_path;
            popularposters[i].src = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : '../Images/placeholder.jpg';
        }

        const heroPath = mergedContent[0].poster_path || mergedContent[0].backdrop_path;
        document.getElementById("containall").style.backgroundImage =
            `url('https://image.tmdb.org/t/p/original${heroPath}')`;

        document.getElementById("thefirst_title").innerHTML = mergedContent[0].title;

    } catch (error) {
        console.error("An error has occurred:", error);
    }
}

GetPopularTMDbTitles();


const housinten = [];

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
            const content_title = returnvalues[index]?.title || returnvalues[index]?.name || "Untitled";
            const itemId = returnvalues[index].id;
            housinten.push(itemId);

            async function getvidtrailers() {
                try {
                    const type = returnvalues[index].title ? "movie" : "tv";
                    const response = await fetch(`https://api.themoviedb.org/3/${type}/${itemId}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`);
                    const viddata = await response.json();

                    const trailer = viddata.results.find(v => v.site === "YouTube" && v.type === "Trailer");
                    if (trailer) {
                        const theiframe = popup.querySelector("iframe");
                        theiframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
                    }
                } catch (error) {
                    console.log("An error has occoured" + error);
                }
            }
            getvidtrailers();

            popup.innerHTML = `
        <div class="thecontent" tabindex="0">
        <div id="postedon" class="containpost">
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
                <ul class="contenttag_popularlist"></ul>
                <p class="content_discribtion">${returnvalues[index]?.overview || "No description available"}</p>
            </div>
        </div>
        </div>`;

            const thegenres = returnvalues[index].genre_ids;
            const namedgenres = thegenres.map(id => lookouttable[id]);

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
        const theiframe = popup.querySelector("iframe");
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
        const Hiddengem_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=27`)
        const Hiddengem_shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=27`)
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

        const gemposters = document.getElementsByClassName("Cardposter-horror")

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

    document.querySelectorAll('.thecontent-horror').forEach((el, index) => {
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

            const posterSrc = el.querySelector(".Cardposter-horror")?.src || '../Images/placeholder.jpg';
            const content_title = pushmerge_gems[0][index].title || pushmerge_gems[0][index].name || "Untitled";

            async function getvidtrailers_gems() {
                try {
                    const item = pushmerge_gems[0][index]
                    const type = item.title ? "movie" : "tv"

                    const response = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`)
                    const viddata = await response.json()

                    const embedkey = viddata.results[0]?.key
                    if (embedkey) {
                       const theiframe = popup.querySelector("iframe"); 
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
const Export_fun_Recent = []
const pushmerge_Recent = []
const Trailer_Recent = []

async function GettingHiddenRecentcontent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"
        const RecentMoviesRes1 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&sort_by=release_date.desc&page=1`);
        const RecentMoviesRes2 = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&sort_by=release_date.desc&page=2`);
        const RecentShowsRes1 = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&sort_by=first_air_date.desc&page=1`);
        const RecentShowsRes2 = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&sort_by=first_air_date.desc&page=2`);
        const Clear_HiddenRecent_movies1 = await RecentMoviesRes1.json()
        const Clear_HiddenRecent_movies2 = await RecentMoviesRes2.json()
        const Clear_HiddenRecent_shows1 = await RecentShowsRes1.json()
        const Clear_HiddenRecent_shows2 = await RecentShowsRes2.json()

        Export_fun_Recent.push(Clear_HiddenRecent_movies1)
        Export_fun_Recent.push(Clear_HiddenRecent_movies2)
        Export_fun_Recent.push(Clear_HiddenRecent_shows1)
        Export_fun_Recent.push(Clear_HiddenRecent_shows2)

        const combinedResults = [...Clear_HiddenRecent_movies1.results, ...Clear_HiddenRecent_movies2.results, ...Clear_HiddenRecent_shows1.results, ...Clear_HiddenRecent_shows2.results]

        async function filterWithTrailer(items) {
            const resultsWithTrailer = []
            for (let item of items) {
                if (!(item.poster_path || item.backdrop_path)) continue
                const type = item.title ? "movie" : "tv"
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=${APIkey}&language=en-US`)
                    const viddata = await response.json()
                    const trailer = viddata.results.find(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"))
                    if (trailer) {
                        item._trailerKey = trailer.key
                        resultsWithTrailer.push(item)
                    }
                } catch (e) {
                    continue
                }
            }
            return resultsWithTrailer
        }

        const merged_Recent = await filterWithTrailer(combinedResults)

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
        }
        shuffle(merged_Recent)

        pushmerge_Recent.push(merged_Recent)

        const gemposters = document.getElementsByClassName("Cardposter-Recent")

        for (let i = 0; i < merged_Recent.length && i < gemposters.length; i++) {
            const posterPath = merged_Recent[i].poster_path || merged_Recent[i].backdrop_path;
            const posterUrl = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : '../Images/Red_Demo_redemotion.jfif';
            gemposters[i].src = posterUrl;
        }

    } catch (error) {
        console.error('An error has occoured:', error);
    }
}
GettingHiddenRecentcontent()

document.addEventListener("DOMContentLoaded", function namedfunq() {
    let currentPopup = null;
    let popupRemovalTimeout = null;

    document.querySelectorAll('.thecontent-Recent').forEach((el, index) => {
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

            const posterSrc = el.querySelector(".Cardposter-Recent")?.src || '../Images/placeholder.jpg';
            const content_title = pushmerge_Recent[0][index].title || pushmerge_Recent[0][index].name || "Untitled";

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
                        <ul class="contenttag_Recent"></ul>
                        <p class="content_discribtion">${pushmerge_Recent[0][index].overview || "No description available"}</p>
                    </div>
                </div>
            </div>`;

            const theiframe = popup.querySelector(".trailervidi");
            theiframe.src = `https://www.youtube.com/embed/${pushmerge_Recent[0][index]._trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;

            const thegenres = pushmerge_Recent[0][index].genre_ids;
            const namedgenres = thegenres.map(id => lookouttable[id]);

            document.body.appendChild(popup);
            currentPopup = popup;

            const thegenlist = document.querySelector(".contenttag_Recent");
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
// const isMobileMQ = window.matchMedia("(max-width: 760px)");
function getUserCountry() {
    const locale =
        Intl.DateTimeFormat().resolvedOptions().locale ||
        navigator.language ||
        "en-US";

    const parts = locale.split("-");
    return parts.length > 1 ? parts[1] : "US";
    
}
getUserCountry()
