const intro    = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const actions  = document.getElementById("actions");

startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  document.getElementById("ar-container").style.display = "block";
});

window.addEventListener("DOMContentLoaded", () => {
  const sceneEl = document.querySelector("a-scene");

  // Esperar a que A-Frame esté listo antes de escuchar eventos
  sceneEl.addEventListener("loaded", () => {

    const target = document.querySelector("#target");

    // Capas: de fondo a frente
    // orden de aparición: primero las del fondo, última la principal
    const echoLayers = [
      { id: "img4", opacity: 0.10, delay:   0 },
      { id: "img3", opacity: 0.22, delay: 100 },
      { id: "img2", opacity: 0.40, delay: 200 },
      { id: "img1", opacity: 0.65, delay: 300 },
      { id: "img0", opacity: 1.00, delay: 400 },
    ];

    target.addEventListener("targetFound", () => {
      actions.style.display = "flex";

      echoLayers.forEach(({ id, opacity, delay }) => {
        const el = document.querySelector(`#${id}`);
        if (!el) return;

        setTimeout(() => {
          el.setAttribute("animation__scale", [
            "property: scale",
            "to: 1 1 1",
            "dur: 600",
            "easing: easeOutBack"
          ].join("; "));

          el.setAttribute("animation__opacity", [
            "property: material.opacity",
            `to: ${opacity}`,
            "dur: 500",
            "easing: easeOutQuad"
          ].join("; "));
        }, delay);
      });
    });

    target.addEventListener("targetLost", () => {
      actions.style.display = "none";

      echoLayers.forEach(({ id }) => {
        const el = document.querySelector(`#${id}`);
        if (!el) return;
        el.removeAttribute("animation__scale");
        el.removeAttribute("animation__opacity");
        el.setAttribute("scale",    "0 0 0");
        el.setAttribute("material", "opacity: 0; transparent: true; alphaTest: 0.01;");
      });
    });

  }); // fin sceneEl loaded
});