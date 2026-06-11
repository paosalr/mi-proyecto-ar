const intro     = document.getElementById("intro");
const startBtn  = document.getElementById("startBtn");
const actions   = document.getElementById("actions");
const container = document.getElementById("ar-container");

// Eco hacia ARRIBA (Y positivo) con opacidad decreciente
// La capa 0 es la principal en el centro, las demás suben
const echoLayers = [
  { id: "img4", x:"0", y: "0.30", z:"0", opacity: 0.08, delay:   0 },
  { id: "img3", x:"0", y: "0.22", z:"0", opacity: 0.18, delay: 100 },
  { id: "img2", x:"0", y: "0.14", z:"0", opacity: 0.32, delay: 200 },
  { id: "img1", x:"0", y: "0.07", z:"0", opacity: 0.55, delay: 300 },
  { id: "img0", x:"0", y: "0",    z:"0", opacity: 1.00, delay: 400 },
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
          // Entrada: escala con rebote
          el.setAttribute("animation__scale",
            "property: scale; to: 1 1 1; dur: 600; easing: easeOutBack"
          );
          // Fade in a opacidad final
          el.setAttribute("animation__opacity",
            `property: material.opacity; to: ${opacity}; dur: 500; easing: easeOutQuad`
          );

          // Solo la imagen principal flota (sube y baja en loop)
          if (id === "img0") {
            const baseY = 0;
            el.setAttribute("animation__float",
              `property: position; to: 0 ${baseY + 0.06} 0; dur: 1800; dir: alternate; loop: true; easing: easeInOutSine`
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
        el.setAttribute("position", `0 ${y} 0`);
        el.setAttribute("material", "opacity: 0; transparent: true; alphaTest: 0.01;");
      });
    });
  });
});