
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
        document.getElementById("setit").innerHTML = `${countryName}'s Top 10 movies today!`
        const moviesRes = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&region=${regionCode}`);
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

 const heroItem = mergedContent[0];

const heroPath = heroItem.backdrop_path || heroItem.poster_path;
// document.getElementById("containall").style.backgroundImage =
    // `url('https://image.tmdb.org/t/p/original${heroPath}')`;

document.getElementsByClassName("thefirst_title").innerHTML =
    heroItem.title || heroItem.original_name;

    async function loadHeroTrailer(item) {
    try {
        const type = item.title ? "movie" : "tv";

        const res = await fetch(
            `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`
        );
        const data = await res.json();

        const trailer = data.results.find(
            v => v.site === "YouTube" && v.type === "Trailer"
        );

        if (!trailer) return;

        const iframe = document.getElementById("hero-trailer");

        // Netflix-like delay
        
            iframe.src =
                `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1`;
            iframe.style.opacity = "1";

    } catch (e) {
        console.log("Hero trailer unavailable");
    }
}

loadHeroTrailer(heroItem);


    } catch (error) {
        console.error("An error has occurred:", error);
    }
}
GetPopularTMDbTitles();
let actioned = document.getElementsByClassName("thecontent-action");
for (let i = 0; i < actioned.length; i++) {
    console.log("this is the number of action content cards");
  
}
let horrored = document.getElementsByClassName("thecontent-horror");
for (let i = 0; i < horrored.length; i++) {
    console.log("this is the number of horror content cards");
}
let toprated = document.getElementsByClassName("thecontent-toprated");
for (let i = 0; i < toprated.length; i++) {
    console.log("this is the number of top rated content cards");
}
let comed = document.getElementsByClassName("thecontent-comedy");
for (let i = 0; i < comed.length; i++) {
    console.log("this is the number of comedy content cards");
}
let Romance = document.getElementsByClassName("thecontent-Romance");
for (let i = 0; i < Romance.length; i++) {
    console.log("this is the number of Romance content cards");
}
let upcoming = document.getElementsByClassName("thecontent-upcoming");
for (let i = 0; i < upcoming.length; i++) {
    console.log("this is the number of upcoming content cards");
}
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
const Export_fun_Horror = []
const pushmerge_Horror = []
const Trailer_Horror = []

async function GettingHiddengemcontent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"
        const Hiddengem_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=27`)
        const Hiddengem_shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=27`)
        const Clear_Hiddengem_movies = await Hiddengem_movies.json()
        const Clear_Hiddengem_shows = await Hiddengem_shows.json()

        Export_fun_Horror.push(Clear_Hiddengem_movies)
        Export_fun_Horror.push(Clear_Hiddengem_shows)

        const merged_Horror = [...Clear_Hiddengem_movies.results, ...Clear_Hiddengem_shows.results]

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
        }
        shuffle(merged_Horror)

        pushmerge_Horror.push(merged_Horror)

        const gemposters = document.getElementsByClassName("Cardposter-horror")

        for (let i = 0; i < merged_Horror.length && i < gemposters.length; i++) {
            const posterPath = merged_Horror[i].poster_path || merged_Horror[i].backdrop_path;
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
            const content_title = pushmerge_Horror[0][index].title || pushmerge_Horror[0][index].name || "Untitled";

            async function getvidtrailers_Horror() {
                try {
                    const item = pushmerge_Horror[0][index]
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
            getvidtrailers_Horror()

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
                        <ul class="contenttag_Horror"></ul>
                        <p class="content_discribtion">${pushmerge_Horror[0][index].overview || "No description available"}</p>
                    </div>
                </div>
            </div>`;

            const thegenres = pushmerge_Horror[0][index].genre_ids;
            const namedgenres = thegenres.map(id => lookouttable[id]);

            document.body.appendChild(popup);
            currentPopup = popup;

            const thegenlist = document.querySelector(".contenttag_Horror");
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
const returnvalues_toprated = []

async function GetTopRatedTMDbTitles() {
    try {
        const apiKey = "185134e7391a581ac86e9efd4a3a4bb3"

        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
        const tvRes = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`)

        const movieData = await movieRes.json()
        const tvData = await tvRes.json()

        const mergedContent = [...movieData.results, ...tvData.results].filter(i => i.poster_path || i.backdrop_path)

        function shuffle(array) {
            let currentIndex = array.length
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--
                ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
            }
        }
        shuffle(mergedContent)

        returnvalues_toprated.push(...mergedContent)

        const posters = document.getElementsByClassName("Cardposter-toprated")

        for (let i = 0; i < posters.length && i < mergedContent.length; i++) {
            const posterPath = mergedContent[i].poster_path || mergedContent[i].backdrop_path
            posters[i].src = `https://image.tmdb.org/t/p/original${posterPath}`
        }

    } catch (error) {
        console.error("An error has occoured:", error)
    }
}
GetTopRatedTMDbTitles()

document.addEventListener("DOMContentLoaded", function () {
    let currentPopup = null
    let popupRemovalTimeout = null

    document.querySelectorAll(".thecontent-toprated").forEach((el, index) => {
        el.addEventListener("focusin", () => {

            if (popupRemovalTimeout) {
                clearTimeout(popupRemovalTimeout)
                popupRemovalTimeout = null
            }

            if (currentPopup) {
                currentPopup.remove()
                currentPopup = null
            }

            const popup = document.createElement("div")
            popup.classList.add("popup-sim")
            popup.setAttribute("tabindex", "-1")

            const posterSrc = el.querySelector(".Cardposter-toprated")?.src || "../Images/placeholder.jpg"
            const content_title = returnvalues_toprated[index]?.title || returnvalues_toprated[index]?.name || "Untitled"
            const itemId = returnvalues_toprated[index].id

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
                        <ul class="contenttag_toprated"></ul>
                        <p class="content_discribtion">${returnvalues_toprated[index]?.overview || "No description available"}</p>
                    </div>
                </div>
            </div>`

            async function getTrailer() {
                try {
                    const type = returnvalues_toprated[index].title ? "movie" : "tv"
                    const response = await fetch(`https://api.themoviedb.org/3/${type}/${itemId}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`)
                    const data = await response.json()

                    const trailer = data.results.find(v => v.site === "YouTube" && v.type === "Trailer")
                    if (trailer) {
                        popup.querySelector("iframe").src =
                            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`
                    }
                } catch (error) {}
            }
            getTrailer()

            const genres = returnvalues_toprated[index].genre_ids
            const namedgenres = genres.map(id => lookouttable[id])

            document.body.appendChild(popup)
            currentPopup = popup

            const genlist = popup.querySelector(".contenttag_toprated")
            genlist.innerHTML = ""
            namedgenres.forEach(g => {
                const li = document.createElement("li")
                li.innerHTML = g
                genlist.appendChild(li)
            })

            const rect = el.getBoundingClientRect()
            const style = document.createElement("style")
            style.textContent = `@keyframes movePopup_${Date.now()} {
                from { top: ${rect.top}px; left: ${rect.left + window.scrollX}px; }
                to { top: ${35}%; left: ${35}%; }
            }`
            document.head.appendChild(style)

            popup.style.position = "fixed"
            popup.style.animation = `movePopup_${Date.now()} 0.35s ease-out forwards`

            popup.querySelector(".displaymore")?.addEventListener("click", e => {
                e.preventDefault()
                popup.classList.remove("popup-sim")
                popup.classList.add("helphereplz")
            })
        })

        el.addEventListener("focusout", () => {
            popupRemovalTimeout = setTimeout(() => {
                if (currentPopup && !currentPopup.contains(document.activeElement)) {
                    currentPopup.remove()
                    currentPopup = null
                }
            }, 150)
        })
    })
})
const Trending_scope = [];
const Trending_merge = [];

async function GettingTrendingContent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3";

        const TrendingRes = await fetch(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${APIkey}`
        );
        const TrendingData = await TrendingRes.json();

        Trending_scope.push(TrendingData);

        const filtered = TrendingData.results.filter(
            item => item.poster_path || item.backdrop_path
        );

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] =
                    [array[randomIndex], array[currentIndex]];
            }
        }

        shuffle(filtered);
        Trending_merge.push(filtered);

        const posters = document.getElementsByClassName("Cardposter-trending");

        for (let i = 0; i < posters.length && i < filtered.length; i++) {
            const posterPath = filtered[i].poster_path || filtered[i].backdrop_path;
            posters[i].src = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : 'https://via.placeholder.com/300x450?text=No+Image';
        }

    } catch (error) {
        console.error(error);
    }
}

GettingTrendingContent();

document.addEventListener("DOMContentLoaded", function () {
    let currentPopup = null;
    let popupRemovalTimeout = null;

    document.querySelectorAll('.thecontent-trending').forEach((el, index) => {

        el.addEventListener('focusin', () => {

            if (popupRemovalTimeout) {
                clearTimeout(popupRemovalTimeout);
                popupRemovalTimeout = null;
            }

            if (currentPopup) {
                currentPopup.remove();
                currentPopup = null;
            }

            const item = Trending_merge[0]?.[index];
            if (!item) return;

            const popup = document.createElement('div');
            popup.classList.add('popup-sim');
            popup.setAttribute('tabindex', '-1');

            const posterSrc =
                el.querySelector(".Cardposter-trending")?.src ||
                '../Images/placeholder.jpg';

            const content_title =
                item.title || item.name || "Untitled";

            async function getTrendingTrailer() {
                try {
                    const type = item.title ? "movie" : "tv";
                    const res = await fetch(
                        `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3&language=en-US`
                    );
                    const data = await res.json();

                    const trailer = data.results.find(
                        v => v.site === "YouTube" && v.type === "Trailer"
                    );

                    if (trailer) {
                        popup.querySelector("iframe").src =
                            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`;
                    }
                } catch (err) {
                    console.error(err);
                }
            }

            popup.innerHTML = `
                <div class="thecontent" tabindex="0">
                    <div class="containpost">
                        <img id="tryme" src="${posterSrc}">
                        <iframe class="trailervidi" allowfullscreen></iframe>
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
                            <ul class="contenttag_trending"></ul>
                            <p class="content_discribtion">${item.overview || "No description available"}</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(popup);
            currentPopup = popup;

            getTrendingTrailer();

            const genres = item.genre_ids || [];
            const namedgenres = genres.map(id => lookouttable[id]);
            const genlist = popup.querySelector(".contenttag_trending");

            genlist.innerHTML = "";
            namedgenres.forEach(g => {
                const li = document.createElement("li");
                li.innerHTML = g;
                genlist.appendChild(li);
            });

            const rect = el.getBoundingClientRect();
            const style = document.createElement("style");
            style.textContent = `
                @keyframes movePopup_${Date.now()} {
                    from {
                        top: ${rect.top}px;
                        left: ${rect.left + window.scrollX}px;
                    }
                    to {
                        top: 35%;
                        left: 35%;
                    }
                }
            `;
            document.head.appendChild(style);

            popup.style.position = "fixed";
            popup.style.animation = `movePopup_${Date.now()} 0.35s ease-out forwards`;

            popup.querySelector(".displaymore")?.addEventListener("click", e => {
                e.preventDefault();

                popup.classList.remove("popup-sim");
                popup.classList.add("helphereplz");

                setTimeout(() => {
                    popup.classList.add("deletmoi");
                    document.body.classList.add("noscroll");

                    popup.addEventListener("focusout", () => {
                        document.body.classList.remove("noscroll");
                        popup.remove();
                    });
                }, 100);
            });
        });

        el.addEventListener('focusout', () => {
            popupRemovalTimeout = setTimeout(() => {
                if (currentPopup && !currentPopup.contains(document.activeElement)) {
                    currentPopup.remove();
                    currentPopup = null;
                }
            }, 150);
        });
    });

    document.getElementById("allbutpop")?.addEventListener("click", () => {
        document.querySelectorAll(".deletmoi").forEach(p => p.remove());
        document.body.classList.remove("noscroll");
    });
});

const Comedy_merge = [];

async function GetComedyContent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3";

        const moviesRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=35`);
        const showsRes = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=35`);

        const moviesData = await moviesRes.json();
        const showsData = await showsRes.json();

        const merged = [...moviesData.results, ...showsData.results];
        Comedy_merge.push(...merged);

        const posters = document.getElementsByClassName("Cardposter-comedy");

        for (let i = 0; i < posters.length && i < Comedy_merge.length; i++) {
            const path = Comedy_merge[i].poster_path || Comedy_merge[i].backdrop_path;
            posters[i].src = path
                ? `https://image.tmdb.org/t/p/original${path}`
                : 'https://via.placeholder.com/300x450?text=No+Image';
        }
    } catch (e) {
        console.error(e);
    }
}

GetComedyContent();

document.addEventListener("DOMContentLoaded", () => {
    let currentPopup = null;
    let removeTimeout = null;

    document.querySelectorAll(".thecontent-comedy").forEach((el, index) => {
        el.addEventListener("focusin", () => {
            if (!Comedy_merge[index]) return;

            if (removeTimeout) clearTimeout(removeTimeout);
            if (currentPopup) currentPopup.remove();

            const item = Comedy_merge[index];
            const popup = document.createElement("div");
            popup.className = "popup-sim";
            popup.tabIndex = -1;

            const posterSrc = el.querySelector(".Cardposter-comedy")?.src;
            const title = item.title || item.name || "Untitled";

            popup.innerHTML = `
                <div class="thecontent" tabindex="0">
                    <div class="containpost">
                        <img src="${posterSrc}">
                        <iframe class="trailervidi" allowfullscreen></iframe>
                    </div>
                    <div class="contentdetails">
                        <div class="moviebuttons">
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
                            <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
                        </div>
                        <div class="contentstats">
                            <p class="contentname">${title}</p>
                            <ul class="contenttag_comedy"></ul>
                            <p class="content_discribtion">${item.overview || "No description available"}</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(popup);
            currentPopup = popup;

            const genreList = popup.querySelector(".contenttag_comedy");
            item.genre_ids?.forEach(id => {
                const li = document.createElement("li");
                li.textContent = lookouttable[id];
                genreList.appendChild(li);
            });

            const type = item.title ? "movie" : "tv";
            fetch(`https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3`)
                .then(r => r.json())
                .then(v => {
                    const trailer = v.results.find(x => x.site === "YouTube" && x.type === "Trailer");
                    if (trailer) {
                        popup.querySelector("iframe").src =
                            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0`;
                    }
                });

            const rect = el.getBoundingClientRect();
            const anim = `moveComedy_${Date.now()}`;
            const style = document.createElement("style");
            style.textContent = `
                @keyframes ${anim} {
                    from { top:${rect.top}px; left:${rect.left}px; }
                    to { top:35%; left:35%; }
                }
            `;
            document.head.appendChild(style);

            popup.style.position = "fixed";
            popup.style.animation = `${anim} 0.35s ease-out forwards`;

            popup.addEventListener("focusout", () => popup.remove());

            popup.querySelector(".displaymore")?.addEventListener("click", e => {
                e.preventDefault();
                popup.classList.remove("popup-sim");
                popup.classList.add("helphereplz", "deletmoi");
                document.body.classList.add("noscroll");
            });
        });

        el.addEventListener("focusout", () => {
            removeTimeout = setTimeout(() => {
                if (currentPopup && !currentPopup.contains(document.activeElement)) {
                    currentPopup.remove();
                    currentPopup = null;
                }
            }, 150);
        });
    });

    document.getElementById("allbutpop")?.addEventListener("click", () => {
        document.querySelectorAll(".deletmoi").forEach(e => e.remove());
        document.body.classList.remove("noscroll");
    });
});

const Export_upcoming = [];
const pushmerge_upcoming = [];

const APIkey = "185134e7391a581ac86e9efd4a3a4bb3";

async function GettingUpcomingContent() {
    try {
        const Upcoming_movies = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIkey}&language=en-US&page=1`
        );

        const clearUpcoming = await Upcoming_movies.json();

        Export_upcoming.push(clearUpcoming);
        pushmerge_upcoming.push(clearUpcoming.results);

        const posters = document.getElementsByClassName("Cardposter-upcoming");

        for (let i = 0; i < posters.length && i < clearUpcoming.results.length; i++) {
            const posterPath =
                clearUpcoming.results[i].poster_path ||
                clearUpcoming.results[i].backdrop_path;

            posters[i].src = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : "https://via.placeholder.com/300x450?text=No+Image";
        }
    } catch (error) {
        console.error("Upcoming fetch error:", error);
    }
}

GettingUpcomingContent();

document.addEventListener("DOMContentLoaded", () => {
    let currentPopup = null;
    let popupRemovalTimeout = null;

    document.querySelectorAll(".thecontent-upcoming").forEach((el, index) => {
        el.addEventListener("focusin", () => {
            if (!pushmerge_upcoming[0]) return;

            if (popupRemovalTimeout) {
                clearTimeout(popupRemovalTimeout);
                popupRemovalTimeout = null;
            }

            if (currentPopup) {
                currentPopup.remove();
                currentPopup = null;
            }

            const item = pushmerge_upcoming[0][index];
            if (!item) return;

            const popup = document.createElement("div");
            popup.classList.add("popup-sim");
            popup.setAttribute("tabindex", "-1");

            const posterSrc =
                el.querySelector(".Cardposter-upcoming")?.src ||
                "../Images/placeholder.jpg";

            const title = item.title || "Untitled";

            popup.innerHTML = `
                <div class="thecontent" tabindex="0">
                    <div class="containpost">
                        <img src="${posterSrc}">
                        <iframe class="trailervidi" src="" allowfullscreen></iframe>
                    </div>
                    <div class="contentdetails">
                        <div class="moviebuttons">
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
                            <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
                        </div>
                        <div class="contentstats">
                            <p class="contentname">${title}</p>
                            <ul class="contenttag_upcoming"></ul>
                            <p class="content_discribtion">${item.overview || "No description available"}</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(popup);
            currentPopup = popup;

            const genreList = popup.querySelector(".contenttag_upcoming");
            genreList.innerHTML = "";

            (item.genre_ids || []).forEach(id => {
                if (lookouttable[id]) {
                    const li = document.createElement("li");
                    li.textContent = lookouttable[id];
                    genreList.appendChild(li);
                }
            });

            async function getUpcomingTrailer() {
                try {
                    const res = await fetch(
                        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${APIkey}&language=en-US`
                    );
                    const data = await res.json();
                    if (!data.results.length) return;

                    popup.querySelector("iframe").src =
                        `https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&mute=1&controls=0&rel=0`;
                } catch (error) {
                    console.error(error);
                }
            }

            getUpcomingTrailer();

            const rect = el.getBoundingClientRect();
            const animName = `movePopup_${Date.now()}`;

            const style = document.createElement("style");
            style.textContent = `
                @keyframes ${animName} {
                    from {
                        top: ${rect.top}px;
                        left: ${rect.left}px;
                    }
                    to {
                        top: 35%;
                        left: 35%;
                    }
                }
            `;
            document.head.appendChild(style);

            popup.style.position = "fixed";
            popup.style.animation = `${animName} 0.35s ease-out forwards`;

            popup.addEventListener("focusout", () => {
                popupRemovalTimeout = setTimeout(() => {
                    if (!popup.contains(document.activeElement)) {
                        popup.remove();
                        currentPopup = null;
                    }
                }, 150);
            });

            popup.querySelector(".displaymore")?.addEventListener("click", e => {
                e.preventDefault();
                popup.classList.remove("popup-sim");
                popup.classList.add("helphereplz");
                document.body.classList.add("noscroll");

                popup.addEventListener("focusout", () => {
                    popup.remove();
                    document.body.classList.remove("noscroll");
                });
            });
        });

        el.addEventListener("focusout", () => {
            popupRemovalTimeout = setTimeout(() => {
                if (currentPopup && !currentPopup.contains(document.activeElement)) {
                    currentPopup.remove();
                    currentPopup = null;
                }
            }, 150);
        });
    });
});

const Export_fun_scoping_romance = []
const pushmerge_romance = []

async function GettingRomanceContent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"

        const Romance_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=10749`)
        const Romance_Shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=10749`)

        const clearRomance_Movies = await Romance_movies.json()
        const clearRomance_Shows = await Romance_Shows.json()

        Export_fun_scoping_romance.push(clearRomance_Movies)
        Export_fun_scoping_romance.push(clearRomance_Shows)

        function shuffle(array) {
            let currentIndex = array.length
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--
                ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
            }
        }

        const mergedstuff = [...clearRomance_Movies.results, ...clearRomance_Shows.results]
        shuffle(mergedstuff)
        pushmerge_romance.push(mergedstuff)

        const romanceposters = document.getElementsByClassName("Cardposter-Romance")

        for (let i = 0; i < mergedstuff.length && i < romanceposters.length; i++) {
            const posterPath = mergedstuff[i].poster_path || mergedstuff[i].backdrop_path
            romanceposters[i].src = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
        }
    } catch (error) {
        console.error(error)
    }
}
GettingRomanceContent()

document.addEventListener("DOMContentLoaded", function () {
    let currentPopup = null
    let popupRemovalTimeout = null

    document.querySelectorAll('.thecontent-Romance').forEach((el, index) => {
        el.addEventListener('focusin', () => {
            if (popupRemovalTimeout) {
                clearTimeout(popupRemovalTimeout)
                popupRemovalTimeout = null
            }

            if (currentPopup) {
                currentPopup.remove()
                currentPopup = null
            }

            const popup = document.createElement('div')
            popup.classList.add('popup-sim')
            popup.setAttribute('tabindex', '-1')

            const posterSrc = el.querySelector(".Cardposter-Romance")?.src
            const content_title = pushmerge_romance[0][index].title || pushmerge_romance[0][index].name || "Untitled"

            async function getvidtrailers_romance() {
                try {
                    const theitem = pushmerge_romance[0][index]
                    const type = theitem.title ? "movie" : "tv"
                    const response = await fetch(`https://api.themoviedb.org/3/${type}/${theitem.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3`)
                    const viddata = await response.json()
                    if (viddata.results.length > 0) {
                        const embedkey = viddata.results[0].key
                        const theiframe = popup.querySelector("iframe")
                        theiframe.src = `https://www.youtube.com/embed/${embedkey}?autoplay=1&mute=1&controls=0&rel=0`
                    }
                } catch (error) {}
            }

            popup.innerHTML = `
                <div class="thecontent" tabindex="0">
                    <div class="containpost">
                        <img src="${posterSrc}">
                        <iframe class="trailervidi" src="" allowfullscreen></iframe>
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
                            <ul class="contenttag_romance"></ul>
                            <p class="content_discribtion">${pushmerge_romance[0][index].overview || "No description available"}</p>
                        </div>
                    </div>
                </div>
            `

            document.body.appendChild(popup)
            currentPopup = popup
            getvidtrailers_romance()

            const thegenres = pushmerge_romance[0][index].genre_ids || []
            const namedgenres = thegenres.map(id => lookouttable[id])
            const thegenlist = popup.querySelector(".contenttag_romance")
            thegenlist.innerHTML = ""
            namedgenres.forEach(g => {
                const li = document.createElement("li")
                li.innerHTML = g
                thegenlist.appendChild(li)
            })

            const rect = el.getBoundingClientRect()
            const anim = document.createElement("style")
            anim.textContent = `
                @keyframes movePopup_romance_${Date.now()} {
                    from { top:${rect.top}px; left:${rect.left}px; }
                    to { top:35%; left:35%; }
                }
            `
            document.head.appendChild(anim)

            popup.style.position = "fixed"
            popup.style.animation = `movePopup_romance_${Date.now()} 0.35s ease-out forwards`

            popup.addEventListener("focusout", () => popup.remove())

            popup.querySelector(".displaymore").addEventListener("click", e => {
                e.preventDefault()
                popup.style.position = ""
                popup.classList.remove("popup-sim")
                popup.classList.add("helphereplz")
                document.body.classList.add("noscroll")

                popup.addEventListener("focusout", () => {
                    popup.remove()
                    document.body.classList.remove("noscroll")
                })
            })
        })

        el.addEventListener('focusout', () => {
            popupRemovalTimeout = setTimeout(() => {
                const focused = document.activeElement
                if (currentPopup && !currentPopup.contains(focused)) {
                    currentPopup.remove()
                    currentPopup = null
                }
            }, 150)
        })
    })
})

const Sci_merge = []
const Sci_export = []

async function GettingSciContent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3"

        const Sci_movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=878,14`)
        const Sci_shows = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=10765`)

        const clearSciMovies = await Sci_movies.json()
        const clearSciShows = await Sci_shows.json()

        const mergedSci = [...clearSciMovies.results, ...clearSciShows.results]

        function shuffle(array) {
            let currentIndex = array.length
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--
                ;[array[currentIndex], array[randomIndex]] = [
                    array[randomIndex],
                    array[currentIndex],
                ]
            }
        }

        shuffle(mergedSci)
        Sci_merge.push(mergedSci)

        const posters = document.getElementsByClassName("Cardposter-Sci")

        for (let i = 0; i < mergedSci.length && i < posters.length; i++) {
            const posterPath = mergedSci[i].poster_path || mergedSci[i].backdrop_path
            posters[i].src = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : "https://via.placeholder.com/300x450?text=No+Image"
        }
    } catch (error) {
        console.error(error)
    }
}

GettingSciContent()

document.addEventListener("DOMContentLoaded", function () {
    let currentPopup = null
    let popupRemovalTimeout = null

    document.querySelectorAll(".thecontent-Sci").forEach((el, index) => {
        el.addEventListener("focusin", () => {
            if (popupRemovalTimeout) {
                clearTimeout(popupRemovalTimeout)
                popupRemovalTimeout = null
            }

            if (currentPopup) {
                currentPopup.remove()
                currentPopup = null
            }

            const popup = document.createElement("div")
            popup.classList.add("popup-sim")
            popup.setAttribute("tabindex", "-1")

            const item = Sci_merge[0][index]
            const posterSrc = el.querySelector(".Cardposter-Sci")?.src
            const title = item.title || item.name || "Untitled"

            async function getTrailer() {
                try {
                    const type = item.title ? "movie" : "tv"
                    const response = await fetch(
                        `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3`
                    )
                    const data = await response.json()
                    const trailer = data.results.find(
                        v => v.site === "YouTube" && v.type === "Trailer"
                    )
                    if (trailer) {
                        popup.querySelector("iframe").src =
                            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&rel=0`
                    }
                } catch {}
            }

            popup.innerHTML = `
            <div class="thecontent" tabindex="0">
                <div class="containpost">
                    <img id="tryme" src="${posterSrc}">
                    <iframe class="trailervidi" src="" allowfullscreen></iframe>
                </div>
                <div class="contentdetails">
                    <div class="moviebuttons">
                        <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
                        <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
                        <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
                        <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
                    </div>
                    <div class="contentstats">
                        <p class="contentname">${title}</p>
                        <ul class="contenttag_sci"></ul>
                        <p class="content_discribtion">${item.overview || "No description available"}</p>
                    </div>
                </div>
            </div>
            `

            document.body.appendChild(popup)
            currentPopup = popup

            const genres = item.genre_ids.map(id => lookouttable[id])
            const genreList = popup.querySelector(".contenttag_sci")
            genreList.innerHTML = ""
            genres.forEach(g => {
                const li = document.createElement("li")
                li.innerHTML = g
                genreList.appendChild(li)
            })

            const rect = el.getBoundingClientRect()
            const style = document.createElement("style")
            const animName = `movePopup_${Date.now()}`
            style.textContent = `
                @keyframes ${animName} {
                    from { top:${rect.top}px; left:${rect.left}px; }
                    to { top:35%; left:35%; }
                }
            `
            document.head.appendChild(style)

            popup.style.position = "fixed"
            popup.style.animation = `${animName} 0.35s ease-out forwards`

            getTrailer()

            popup.addEventListener("focusout", () => popup.remove())

            popup.querySelector(".displaymore").addEventListener("click", e => {
                e.preventDefault()
                popup.classList.remove("popup-sim")
                popup.classList.add("helphereplz")
                document.body.classList.add("noscroll")

                popup.addEventListener("focusout", () => {
                    popup.remove()
                    document.body.classList.remove("noscroll")
                })
            })
        })

        el.addEventListener("focusout", () => {
            popupRemovalTimeout = setTimeout(() => {
                if (currentPopup && !currentPopup.contains(document.activeElement)) {
                    currentPopup.remove()
                    currentPopup = null
                }
            }, 150)
        })
    })
})

const Thriller_export = [];
const Thriller_merge = [];

async function GettingThrillerContent() {
    try {
        const APIkey = "185134e7391a581ac86e9efd4a3a4bb3";

        const Thriller_movies = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${APIkey}&with_genres=53`
        );
        const Thriller_shows = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${APIkey}&with_genres=9648`
        );

        const clearThriller_Movies = await Thriller_movies.json();
        const clearThriller_Shows = await Thriller_shows.json();

        const merged = [
            ...clearThriller_Movies.results,
            ...clearThriller_Shows.results
        ];

        function shuffle(array) {
            let currentIndex = array.length;
            while (currentIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex],
                    array[currentIndex]
                ];
            }
        }

        shuffle(merged);
        Thriller_merge.push(merged);

        const posters = document.getElementsByClassName("Cardposter-Thriller");

        for (let i = 0; i < posters.length && i < merged.length; i++) {
            const posterPath = merged[i].poster_path || merged[i].backdrop_path;
            posters[i].src = posterPath
                ? `https://image.tmdb.org/t/p/original${posterPath}`
                : "https://via.placeholder.com/300x450?text=No+Image";
        }
    } catch (error) {
        console.error(error);
    }
}

GettingThrillerContent();

document.addEventListener("DOMContentLoaded", () => {
    let currentPopup = null;
    let popupRemovalTimeout = null;

    document.querySelectorAll(".thecontent-Thriller").forEach((el, index) => {
        el.addEventListener("focusin", () => {
            if (!Thriller_merge[0]) return;

            if (popupRemovalTimeout) {
                clearTimeout(popupRemovalTimeout);
                popupRemovalTimeout = null;
            }

            if (currentPopup) {
                currentPopup.remove();
                currentPopup = null;
            }

            const item = Thriller_merge[0][index];
            if (!item) return;

            const popup = document.createElement("div");
            popup.classList.add("popup-sim");
            popup.setAttribute("tabindex", "-1");

            const posterSrc =
                el.querySelector(".Cardposter-Thriller")?.src ||
                "../Images/placeholder.jpg";

            const title = item.title || item.name || "Untitled";

            popup.innerHTML = `
                <div class="thecontent" tabindex="0">
                    <div class="containpost">
                        <img src="${posterSrc}">
                        <iframe class="trailervidi" src="" allowfullscreen></iframe>
                    </div>
                    <div class="contentdetails">
                        <div class="moviebuttons">
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-play"></i></button></div>
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-plus"></i></button></div>
                            <div class="containbutton"><button class="buttoncontent"><i class="fa-solid fa-thumbs-up"></i></button></div>
                            <div class="containbutton showmore"><button class="displaymore"><i class="fa-solid fa-chevron-down"></i></button></div>
                        </div>
                        <div class="contentstats">
                            <p class="contentname">${title}</p>
                            <ul class="contenttag_Thriller"></ul>
                            <p class="content_discribtion">${item.overview || "No description available"}</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(popup);
            currentPopup = popup;

            const genreList = popup.querySelector(".contenttag_Thriller");
            genreList.innerHTML = "";

            (item.genre_ids || []).forEach(id => {
                if (lookouttable[id]) {
                    const li = document.createElement("li");
                    li.textContent = lookouttable[id];
                    genreList.appendChild(li);
                }
            });

            async function getTrailer() {
                try {
                    const type = item.title ? "movie" : "tv";
                    const res = await fetch(
                        `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=185134e7391a581ac86e9efd4a3a4bb3`
                    );
                    const data = await res.json();
                    if (!data.results.length) return;
                    popup.querySelector("iframe").src =
                        `https://www.youtube.com/embed/${data.results[0].key}?autoplay=1&mute=1&controls=0&rel=0`;
                } catch {}
            }

            getTrailer();

            const rect = el.getBoundingClientRect();
            const animName = `movePopup_${Date.now()}`;
            const style = document.createElement("style");

            style.textContent = `
                @keyframes ${animName} {
                    from {
                        top: ${rect.top}px;
                        left: ${rect.left}px;
                    }
                    to {
                        top: 35%;
                        left: 35%;
                    }
                }
            `;

            document.head.appendChild(style);
            popup.style.position = "fixed";
            popup.style.animation = `${animName} 0.35s ease-out forwards`;

            popup.addEventListener("focusout", () => {
                popupRemovalTimeout = setTimeout(() => {
                    if (currentPopup && !currentPopup.contains(document.activeElement)) {
                        currentPopup.remove();
                        currentPopup = null;
                    }
                }, 150);
            });

            popup.querySelector(".displaymore")?.addEventListener("click", e => {
                e.preventDefault();
                popup.classList.remove("popup-sim");
                popup.classList.add("helphereplz");
                document.body.classList.add("noscroll");

                popup.addEventListener("focusout", () => {
                    popup.remove();
                    document.body.classList.remove("noscroll");
                });
            });
        });

        el.addEventListener("focusout", () => {
            popupRemovalTimeout = setTimeout(() => {
                if (currentPopup && !currentPopup.contains(document.activeElement)) {
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
