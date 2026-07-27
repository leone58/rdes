// Simulador da topologia em anel com Token Ring.
// Desenha N nós em círculo e anima o token/pacote passando de nó em nó.

const NODES = ["PC 1", "PC 2", "PC 3", "PC 4", "PC 5", "PC 6"];
const CENTER = 200;
const RADIUS = 140;
const NODE_R = 30;

function nodePositions(n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    // começa no topo e vai no sentido horário
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    pts.push({
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    });
  }
  return pts;
}

export function renderRingSimulator(root) {
  const pts = nodePositions(NODES.length);

  const nodesSvg = NODES.map(
    (label, i) => `
      <g class="node" data-node="${i}">
        <circle cx="${pts[i].x}" cy="${pts[i].y}" r="${NODE_R}"></circle>
        <text x="${pts[i].x}" y="${pts[i].y}">${label}</text>
      </g>`
  ).join("");

  const options = NODES.map((l, i) => `<option value="${i}">${l}</option>`).join("");

  root.innerHTML = `
    <div class="stage">
      <svg viewBox="0 0 400 400" role="img" aria-label="Diagrama animado da rede em anel">
        <circle class="ring-path" cx="${CENTER}" cy="${CENTER}" r="${RADIUS}"></circle>
        ${nodesSvg}
        <circle class="packet" id="packet" cx="${pts[0].x}" cy="${pts[0].y}" r="9" style="display:none"></circle>
      </svg>
    </div>

    <div class="sim__panel">
      <div class="select-row">
        <label class="field">
          Origem (quem envia)
          <select id="src">${options}</select>
        </label>
        <label class="field">
          Destino (quem recebe)
          <select id="dst">${options}</select>
        </label>
      </div>

      <div class="legend" aria-hidden="true">
        <span><span class="dot token"></span> Token / permissão para falar</span>
        <span><span class="dot data"></span> Pacote de dados viajando</span>
        <span><span class="dot free"></span> Nó aguardando</span>
      </div>

      <div class="status" id="status" role="status" aria-live="polite">
        Clique em <b>Iniciar</b> para ver o token circular pelo anel.
      </div>

      <div class="controls">
        <button class="btn primary" id="start">▶ Iniciar transmissão</button>
        <button class="btn" id="reset" disabled>↺ Reiniciar</button>
      </div>
    </div>
  `;

  const svg = root.querySelector("svg");
  const packet = root.querySelector("#packet");
  const statusEl = root.querySelector("#status");
  const srcSel = root.querySelector("#src");
  const dstSel = root.querySelector("#dst");
  const startBtn = root.querySelector("#start");
  const resetBtn = root.querySelector("#reset");

  dstSel.value = "3";

  let running = false;

  const nodeGroups = [...svg.querySelectorAll(".node")];

  function clearClasses() {
    nodeGroups.forEach((g) => g.classList.remove("holds-token", "sender", "target"));
  }

  function setStatus(html) {
    statusEl.innerHTML = html;
  }

  // move o pacote suavemente de um ponto a outro
  function moveTo(from, to, duration) {
    return new Promise((resolve) => {
      const start = performance.now();
      function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        // easing suave
        const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        packet.setAttribute("cx", from.x + (to.x - from.x) * e);
        packet.setAttribute("cy", from.y + (to.y - from.y) * e);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  function nextIndex(i) {
    return (i + 1) % NODES.length;
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function run() {
    if (running) return;
    const src = parseInt(srcSel.value, 10);
    const dst = parseInt(dstSel.value, 10);

    if (src === dst) {
      setStatus("⚠ Escolha uma <b>origem</b> e um <b>destino</b> diferentes.");
      return;
    }

    running = true;
    startBtn.disabled = true;
    resetBtn.disabled = true;
    srcSel.disabled = true;
    dstSel.disabled = true;
    clearClasses();

    // Fase 1: token circula até chegar na origem
    packet.classList.remove("data");
    packet.style.display = "block";
    let current = 0;
    packet.setAttribute("cx", pts[0].x);
    packet.setAttribute("cy", pts[0].y);
    setStatus("🎟 O <b>token</b> está circulando pelo anel procurando quem quer transmitir...");

    while (current !== src) {
      const nx = nextIndex(current);
      nodeGroups[current].classList.add("holds-token");
      await moveTo(pts[current], pts[nx], 520);
      nodeGroups[current].classList.remove("holds-token");
      current = nx;
    }

    // Fase 2: origem pega o token
    nodeGroups[src].classList.add("sender");
    nodeGroups[dst].classList.add("target");
    setStatus(
      `✋ <b>${NODES[src]}</b> pegou o token e agora tem permissão para transmitir para <b>${NODES[dst]}</b>.`
    );
    await wait(900);

    // Fase 3: dados viajam da origem até o destino
    packet.classList.add("data");
    setStatus(`📦 Os <b>dados</b> viajam de nó em nó no sentido do anel até <b>${NODES[dst]}</b>.`);
    current = src;
    while (current !== dst) {
      const nx = nextIndex(current);
      await moveTo(pts[current], pts[nx], 620);
      current = nx;
      if (current !== dst) {
        setStatus(
          `➡ <b>${NODES[current]}</b> verifica: "não é para mim", então <b>repassa</b> os dados adiante.`
        );
        await wait(500);
      }
    }

    setStatus(`✅ <b>${NODES[dst]}</b> recebeu a mensagem! Agora o token será liberado.`);
    await wait(1000);

    // Fase 4: token liberado de volta ao anel
    packet.classList.remove("data");
    nodeGroups[src].classList.remove("sender");
    nodeGroups[dst].classList.remove("target");
    setStatus("🎟 Transmissão concluída. O <b>token</b> foi liberado e volta a circular livre pela rede.");
    nodeGroups[dst].classList.add("holds-token");
    await wait(700);
    nodeGroups[dst].classList.remove("holds-token");

    packet.style.display = "none";
    running = false;
    startBtn.disabled = false;
    resetBtn.disabled = false;
    srcSel.disabled = false;
    dstSel.disabled = false;
  }

  function reset() {
    if (running) return;
    clearClasses();
    packet.style.display = "none";
    setStatus("Clique em <b>Iniciar</b> para ver o token circular pelo anel.");
    resetBtn.disabled = true;
  }

  startBtn.addEventListener("click", run);
  resetBtn.addEventListener("click", reset);
}
