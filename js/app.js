const intro     = document.getElementById("intro");
const startBtn  = document.getElementById("startBtn");
const actions   = document.getElementById("actions");
const container = document.getElementById("ar-container");

// Y = -0.3 pone la imagen pegada en la parte baja de la tarjeta
// Las copias del eco suben desde ahí
const BASE_Y = -0.45;

const echoLayers = [
  { id: "img4", y: BASE_Y + 0.30, opacity: 0.08, delay:   0 },
  { id: "img3", y: BASE_Y + 0.22, opacity: 0.18, delay: 100 },
  { id: "img2", y: BASE_Y + 0.14, opacity: 0.32, delay: 200 },
  { id: "img1", y: BASE_Y + 0.07, opacity: 0.55, delay: 300 },
  { id: "img0", y: BASE_Y,        opacity: 1.00, delay: 400 },
];

function buildSceneHTML() {
  const layers = echoLayers.map(({ id, y }) => `
    <a-image id="${id}" src="#brand"
      position="0 ${y.toFixed(3)} 0"
      width="1.8" height="0.9"
      material="opacity: 0; transparent: true; alphaTest: 0.01;"
      scale="0 0 0">
    </a-image>`).join("\n");

  return `
    <a-scene
      mindar-image="imageTargetSrc: ./targets/targets.mind; uiScanning: yes;"
      color-space="sRGB"
      renderer="colorManagement: true;"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: true">

      <a-assets>
        <img id="brand" src="./assets/fondo.png" crossorigin="anonymous">
      </a-assets>

      <a-camera position="0 0 0" look-controls="false"></a-camera>

      <a-entity id="target" mindar-image-target="targetIndex: 0">
        ${layers}
      </a-entity>
    </a-scene>`;
}

startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  container.innerHTML = buildSceneHTML();

  const sceneEl = container.querySelector("a-scene");

  sceneEl.addEventListener("loaded", () => {
    const target = container.querySelector("#target");

    target.addEventListener("targetFound", () => {
      actions.style.display = "flex";

      echoLayers.forEach(({ id, opacity, delay, y }) => {
        const el = container.querySelector(`#${id}`);
        if (!el) return;

        setTimeout(() => {
          el.setAttribute("animation__scale",
            "property: scale; to: 1 1 1; dur: 600; easing: easeOutBack"
          );
          el.setAttribute("animation__opacity",
            `property: material.opacity; to: ${opacity}; dur: 500; easing: easeOutQuad`
          );

          // Solo la imagen principal flota suavemente
          if (id === "img0") {
            el.setAttribute("animation__float",
              `property: position; from: 0 ${y.toFixed(3)} 0; to: 0 ${(y + 0.05).toFixed(3)} 0; dur: 1800; dir: alternate; loop: true; easing: easeInOutSine`
            );
          }
        }, delay);
      });
    });

    target.addEventListener("targetLost", () => {
      actions.style.display = "none";

      echoLayers.forEach(({ id, y }) => {
        const el = container.querySelector(`#${id}`);
        if (!el) return;
        el.removeAttribute("animation__scale");
        el.removeAttribute("animation__opacity");
        el.removeAttribute("animation__float");
        el.setAttribute("scale",    "0 0 0");
        el.setAttribute("position", `0 ${y.toFixed(3)} 0`);
        el.setAttribute("material", "opacity: 0; transparent: true; alphaTest: 0.01;");
      });
    });
  });
});