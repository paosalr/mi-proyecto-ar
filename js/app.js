const intro     = document.getElementById("intro");
const startBtn  = document.getElementById("startBtn");
const actions   = document.getElementById("actions");
const container = document.getElementById("ar-container");

// Eco en profundidad (Z negativo = hacia atrás)
// La capa 0 es la principal al frente, las demás se alejan en Z
const echoLayers = [
  { id: "img4", x: "0", y: "0", z: "-0.20", opacity: 0.10, delay:   0 },
  { id: "img3", x: "0", y: "0", z: "-0.15", opacity: 0.22, delay: 100 },
  { id: "img2", x: "0", y: "0", z: "-0.10", opacity: 0.40, delay: 200 },
  { id: "img1", x: "0", y: "0", z: "-0.05", opacity: 0.65, delay: 300 },
  { id: "img0", x: "0", y: "0", z:  "0",    opacity: 1.00, delay: 400 },
];

function buildSceneHTML() {
  const layers = echoLayers.map(({ id, x, y, z }) => `
    <a-image id="${id}" src="#brand"
      position="${x} ${y} ${z}"
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

      echoLayers.forEach(({ id, opacity, delay }) => {
        const el = container.querySelector(`#${id}`);
        if (!el) return;

        setTimeout(() => {
          el.setAttribute("animation__scale",
            "property: scale; to: 1 1 1; dur: 600; easing: easeOutBack"
          );
          el.setAttribute("animation__opacity",
            `property: material.opacity; to: ${opacity}; dur: 500; easing: easeOutQuad`
          );
        }, delay);
      });
    });

    target.addEventListener("targetLost", () => {
      actions.style.display = "none";

      echoLayers.forEach(({ id }) => {
        const el = container.querySelector(`#${id}`);
        if (!el) return;
        el.removeAttribute("animation__scale");
        el.removeAttribute("animation__opacity");
        el.setAttribute("scale",    "0 0 0");
        el.setAttribute("material", "opacity: 0; transparent: true; alphaTest: 0.01;");
      });
    });
  });
});