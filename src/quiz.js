// Quiz "Pause e Responda" sobre topologia em anel.

const QUESTIONS = [
  {
    q: "Na topologia em anel, cada computador (nó) está conectado a quantos vizinhos?",
    options: ["A um único vizinho", "A exatamente dois vizinhos", "A todos os outros nós", "A um servidor central"],
    answer: 1,
    explain:
      "Cada nó se liga a exatamente dois vizinhos, formando um círculo fechado. Não existe um ponto central.",
  },
  {
    q: "Qual é a função do token no Token Ring?",
    options: [
      "Guardar o endereço IP da rede",
      "Aumentar a velocidade da internet",
      "Dar permissão para um nó transmitir por vez",
      "Armazenar os dados permanentemente",
    ],
    answer: 2,
    explain:
      "O token é uma permissão que circula pelo anel. Só quem está com o token pode transmitir, o que evita colisões.",
  },
  {
    q: "Por que a topologia em anel evita colisões de dados?",
    options: [
      "Porque usa muitos cabos",
      "Porque só existe um token, então só um nó transmite por vez",
      "Porque tem um switch central",
      "Porque os dados viajam nos dois sentidos",
    ],
    answer: 1,
    explain:
      "Como existe apenas um token, apenas uma máquina transmite de cada vez. Duas não falam ao mesmo tempo.",
  },
  {
    q: "O que acontece, tipicamente, se um único nó do anel falha?",
    options: [
      "Nada, a rede continua igual",
      "Apenas esse nó fica sem internet",
      "O anel pode ser interrompido e afetar toda a rede",
      "A velocidade dobra",
    ],
    answer: 2,
    explain:
      "Como os dados passam de nó em nó, a falha de um nó pode romper o anel e parar a rede inteira. Essa é a principal desvantagem.",
  },
  {
    q: "Em que sentido os dados normalmente circulam no anel?",
    options: [
      "Em todos os sentidos ao mesmo tempo",
      "Sempre em uma única direção (ex.: horário)",
      "Do centro para as bordas",
      "De forma aleatória",
    ],
    answer: 1,
    explain:
      "Os dados circulam em um único sentido, passando de vizinho em vizinho até chegar ao destinatário.",
  },
];

export function renderQuiz(root) {
  let index = 0;
  let score = 0;
  let answered = false;

  function render() {
    const item = QUESTIONS[index];
    const keys = ["A", "B", "C", "D"];

    root.innerHTML = `
      <div class="quiz">
        <div class="quiz__score">
          Pergunta <b>${index + 1}</b> de <b>${QUESTIONS.length}</b> · Acertos: <b>${score}</b>
        </div>
        <p class="quiz__q">${item.q}</p>
        <div class="quiz__options" role="group" aria-label="Opções de resposta">
          ${item.options
            .map(
              (opt, i) => `
            <button class="opt" data-i="${i}">
              <span class="key">${keys[i]}</span>
              <span>${opt}</span>
            </button>`
            )
            .join("")}
        </div>
        <div class="quiz__feedback" id="fb" hidden></div>
        <div class="quiz__foot">
          <span class="quiz__score">Responda para liberar a próxima.</span>
          <button class="btn primary" id="next" disabled>
            ${index === QUESTIONS.length - 1 ? "Ver resultado ✓" : "Próxima →"}
          </button>
        </div>
      </div>
    `;

    const optButtons = [...root.querySelectorAll(".opt")];
    const fb = root.querySelector("#fb");
    const nextBtn = root.querySelector("#next");
    answered = false;

    optButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.i, 10);
        const correct = item.answer;

        optButtons.forEach((b, i) => {
          b.disabled = true;
          if (i === correct) b.classList.add("correct");
          if (i === chosen && chosen !== correct) b.classList.add("wrong");
        });

        if (chosen === correct) {
          score++;
          fb.innerHTML = `<b style="color:var(--ok)">Correto!</b> ${item.explain}`;
        } else {
          fb.innerHTML = `<b style="color:var(--danger)">Quase!</b> ${item.explain}`;
        }
        fb.hidden = false;
        nextBtn.disabled = false;
        root.querySelector(".quiz__foot .quiz__score").textContent =
          "Acertos até agora: " + score;
      });
    });

    nextBtn.addEventListener("click", () => {
      if (index < QUESTIONS.length - 1) {
        index++;
        render();
      } else {
        renderResult();
      }
    });
  }

  function renderResult() {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    let msg = "Continue revisando o material — você chega lá! 💪";
    if (pct === 100) msg = "Perfeito! Você dominou a topologia em anel. 🏆";
    else if (pct >= 60) msg = "Muito bom! Você entendeu os principais conceitos. 👏";

    root.innerHTML = `
      <div class="quiz" style="text-align:center">
        <p class="quiz__q">Você acertou <b style="color:var(--brand)">${score}</b> de ${QUESTIONS.length} (${pct}%)</p>
        <p style="color:var(--text-muted)">${msg}</p>
        <div class="quiz__foot" style="justify-content:center">
          <button class="btn primary" id="restart">↺ Refazer o quiz</button>
        </div>
      </div>
    `;
    root.querySelector("#restart").addEventListener("click", () => {
      index = 0;
      score = 0;
      render();
    });
  }

  render();
}
