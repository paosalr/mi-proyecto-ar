const scene = document.querySelector("a-scene");

document
.getElementById("startBtn")
.addEventListener("click", () => {

document
.getElementById("overlay")
.remove();

crearExperiencia();

});

function crearExperiencia() {

const container = document.createElement("a-entity");

container.setAttribute(
"position",
"0 0 -3"
);

container.setAttribute(
"animation",
`
property: rotation;
to: 0 360 0;
loop: true;
dur: 30000;
easing: linear;
`
);

scene.appendChild(container);

const image = document.createElement("a-plane");

image.setAttribute(
"src",
"#brand"
);

image.setAttribute(
"width",
"2.4"
);

image.setAttribute(
"height",
"1.3"
);

image.setAttribute(
"position",
"0 1.2 0"
);

container.appendChild(image);

const webBtn = document.createElement("a-box");

webBtn.setAttribute(
"width",
"1"
);

webBtn.setAttribute(
"height",
"0.3"
);

webBtn.setAttribute(
"depth",
"0.15"
);

webBtn.setAttribute(
"color",
"#111111"
);

webBtn.setAttribute(
"position",
"-0.7 -0.2 0"
);

container.appendChild(webBtn);

const webText = document.createElement("a-text");

webText.setAttribute(
"value",
"Website"
);

webText.setAttribute(
"align",
"center"
);

webText.setAttribute(
"color",
"#FFF"
);

webText.setAttribute(
"position",
"-0.7 -0.2 0.09"
);

webText.setAttribute(
"width",
"3"
);

container.appendChild(webText);

const waBtn = document.createElement("a-box");

waBtn.setAttribute(
"width",
"1"
);

waBtn.setAttribute(
"height",
"0.3"
);

waBtn.setAttribute(
"depth",
"0.15"
);

waBtn.setAttribute(
"color",
"#25D366"
);

waBtn.setAttribute(
"position",
"0.7 -0.2 0"
);

container.appendChild(waBtn);

const waText = document.createElement("a-text");

waText.setAttribute(
"value",
"WhatsApp"
);

waText.setAttribute(
"align",
"center"
);

waText.setAttribute(
"color",
"#FFF"
);

waText.setAttribute(
"position",
"0.7 -0.2 0.09"
);

waText.setAttribute(
"width",
"3"
);

container.appendChild(waText);

webBtn.addEventListener("click", () => {

window.open(
"https://www.imas.agency",
"_blank"
);

});

waBtn.addEventListener("click", () => {

window.open(
"https://wa.me/524461846064",
"_blank"
);

});

}