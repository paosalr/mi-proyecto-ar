const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const actions = document.getElementById("actions");

window.addEventListener("DOMContentLoaded", () => {

  const sceneEl = document.querySelector("a-scene");

  sceneEl.addEventListener("loaded", () => {
    console.log("AFRAME LOADED");
    alert("AFRAME LOADED");
  });

  sceneEl.addEventListener("arReady", () => {
    console.log("AR READY");
    alert("AR READY");
  });

  sceneEl.addEventListener("arError", (e) => {
    console.error("AR ERROR", e);
    alert("AR ERROR");
  });

  startBtn.addEventListener("click", () => {

    intro.style.display = "none";

    const container = document.getElementById("ar-container");
    container.style.visibility = "visible";

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);

  });

  const target = document.querySelector("#target");

  const echoLayers = [
    { id: "img4", opacity: 0.10, delay: 0 },
    { id: "img3", opacity: 0.22, delay: 100 },
    { id: "img2", opacity: 0.40, delay: 200 },
    { id: "img1", opacity: 0.65, delay: 300 },
    { id: "img0", opacity: 1.00, delay: 400 }
  ];

  target.addEventListener("targetFound", () => {

    console.log("TARGET FOUND");

    actions.style.display = "flex";

    echoLayers.forEach(({ id, opacity, delay }) => {

      const el = document.querySelector(`#${id}`);

      if (!el) return;

      setTimeout(() => {

        el.setAttribute(
          "animation__scale",
          "property: scale; to: 1 1 1; dur: 600; easing: easeOutBack"
        );

        el.setAttribute(
          "animation__opacity",
          `property: material.opacity; to: ${opacity}; dur: 500`
        );

      }, delay);

    });

  });

  target.addEventListener("targetLost", () => {

    console.log("TARGET LOST");

    actions.style.display = "none";

    echoLayers.forEach(({ id }) => {

      const el = document.querySelector(`#${id}`);

      if (!el) return;

      el.removeAttribute("animation__scale");
      el.removeAttribute("animation__opacity");

      el.setAttribute("scale", "0 0 0");
      el.setAttribute("material", "opacity: 0; transparent: true;");

    });

  });

});