const intro =
document.getElementById("intro");

const startBtn =
document.getElementById("startBtn");

const actions =
document.getElementById("actions");

startBtn.addEventListener("click", () => {

intro.style.display = "none";

document
.getElementById("ar-container")
.style.display = "block";

});

window.addEventListener("DOMContentLoaded", () => {

const target =
document.querySelector("#target");

const image =
document.querySelector("#brandImage");

target.addEventListener("targetFound", () => {

image.removeAttribute("animation");

image.setAttribute(
"scale",
"0.2 0.2 0.2"
);

setTimeout(() => {

image.setAttribute(
"animation",
`
property: scale;
from: 0.2 0.2 0.2;
to: 1 1 1;
dur: 800;
easing: easeOutElastic;
`
);

}, 50);

actions.style.display = "flex";

});

target.addEventListener("targetLost", () => {

actions.style.display = "none";

});

});