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

image.setAttribute(
"animation",
"property: scale; to: 1 1 1; dur: 700; easing: easeOutBack"
);

actions.style.display = "flex";

});

target.addEventListener("targetLost", () => {

actions.style.display = "none";

});

});