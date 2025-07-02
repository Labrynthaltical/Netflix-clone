
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

        for (let j = 0; j < popupbutton.length; j++) {
            const contento = movies[j];
            const PosterPath1 = contento.poster_path;
            const posterUrl1 = PosterPath1
                ? `https://image.tmdb.org/t/p/original${PosterPath1}`
                : 'https://via.placeholder.com/300x450?text=No+Image';

            let showbuts = popupbutton[j];
            let titles = movies[j].title || movies[j].name;
            let thebowl = document.getElementById("popupcontain");

            showbuts.addEventListener("click", (event) => {
              console.log(event)
                const existing = document.getElementById("deleteme");
                if (existing) existing.remove();

                let popcontain = document.createElement("div");
                let popuptitle = document.createElement("h4");
                popuptitle.classList.add("popup-div_popular-title");

                let thetitle = document.createTextNode(titles);
                popuptitle.appendChild(thetitle);
                popuptitle.style.display = "inline";
                popuptitle.style.color = "red";

                popcontain.classList.add("popup-div_popular");
                popcontain.id = "deleteme";
                popcontain.style.display = "block";
                popcontain.style.backgroundImage = `url('${posterUrl1}')`;

                popcontain.appendChild(popuptitle);
                thebowl.appendChild(popcontain);

                setTimeout(() => {
                    document.getElementById("allbutpop").addEventListener("click", function handleOutsideClick(e) {
                        if (!popcontain.contains(e.target) && !showbuts.contains(e.target)) {
                            popcontain.remove();
                        }
                    }
                  );
                }, );
            });
        }

        // Update first movie preview
        const posterPath = movies[0].poster_path;
        const fullPosterUrl = posterPath
            ? `https://image.tmdb.org/t/p/original${posterPath}`
            : 'https://via.placeholder.com/300x450?text=No+Image';

        document.getElementById("containall").style.backgroundImage = `url('${fullPosterUrl}')`;
        document.getElementById("thefirst_title").innerHTML = movies[0].title;
        document.getElementById("thefirst_describtion").innerHTML = movies[0].overview;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

GetPopularTMDbTitles();
