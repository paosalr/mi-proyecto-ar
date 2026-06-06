const scene = document.querySelector("a-scene");

document
.getElementById("startBtn")
.addEventListener("click", () => {

    document.getElementById("overlay").remove();

    document.getElementById("actions").style.display = "flex";

    crearExperiencia();

});

function crearExperiencia() {

    const image = document.createElement("a-image");

    image.setAttribute("src", "#brand");

    image.setAttribute("width", "2.5");

    image.setAttribute("height", "1.5");

    image.setAttribute("position", "0 0 -3");

    scene.appendChild(image);

}