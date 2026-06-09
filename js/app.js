const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const actions = document.getElementById("actions");

startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  document.getElementById("ar-container").style.display = "block";
});

window.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector("#target");

  // Configuración de las capas de echo
  // Cada capa: [offsetX, offsetZ, opacidad, delay animación]
  const echoLayers = [
    { id: "img0", x:  0.00, z: 0.00, opacity: 1.0, delay: 0   },
    { id: "img1", x: -0.12, z:-0.01, opacity: 0.65, delay: 80  },
    { id: "img2", x: -0.24, z:-0.02, opacity: 0.40, delay: 160 },
    { id: "img3", x: -0.36, z:-0.03, opacity: 0.22, delay: 240 },
    { id: "img4", x: -0.48, z:-0.04, opacity: 0.10, delay: 320 },
  ];

  function getImage(id) {
    return document.querySelector(`#${id}`);
  }

  target.addEventListener("targetFound", () => {
    actions.style.display = "flex";

    echoLayers.forEach((layer) => {
      const el = getImage(layer.id);
      if (!el) return;

      setTimeout(() => {
        el.setAttribute("animation__scale", {
          property: "scale",
          to: "1 1 1",
          dur: 600,
          easing: "easeOutBack",
        });
        el.setAttribute("animation__opacity", {
          property: "material.opacity",
          to: layer.opacity,
          dur: 500,
          easing: "easeOutQuad",
        });
      }, layer.delay);
    });
  });

  target.addEventListener("targetLost", () => {
    actions.style.display = "none";

    echoLayers.forEach((layer) => {
      const el = getImage(layer.id);
      if (!el) return;
      el.setAttribute("scale", "0 0 0");
      el.setAttribute("material", "opacity: 0");
    });
  });
});