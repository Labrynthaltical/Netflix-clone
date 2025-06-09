const totoggle = document.querySelector("details")
const affected = document.querySelector("ul")
function toggleani(){
    affected.classList.remove("animatedrop")
    void affected.offsetWidth;
    affected.classList.add("animatedrop")
}
totoggle.addEventListener("click",toggleani)
