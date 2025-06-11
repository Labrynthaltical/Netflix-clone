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