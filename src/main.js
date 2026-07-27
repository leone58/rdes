import { renderRingSimulator } from "./ring.js";
import { renderQuiz } from "./quiz.js";

const app = document.getElementById("app");

app.innerHTML = `
  <header class="topbar">
    <div class="topbar__inner">
      <div class="brand">
        <span class="brand__dot" aria-hidden="true">◎</span>
        <span>Topologia em Anel</span>
      </div>
      <nav class="nav" aria-label="Navegação da aula">
        <a href="#conceito">1. Conceito</a>
        <a href="#token">2. Token</a>
        <a href="#grafico">3. Fluxo</a>
        <a href="#comparacao">Comparação</a>
        <a href="#quiz">Quiz</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero wrap" aria-labelledby="hero-title">
      <span class="badge">Semana 3 (S3) — Redes de Computadores</span>
      <h1 id="hero-title">Topologia em <span class="grad">Anel</span></h1>
      <p>
        Um material interativo para entender como os computadores se conectam em círculo,
        como o <strong>token</strong> controla quem pode falar e como os dados circulam pela rede.
      </p>
      <div class="hero__meta">
        <span class="chip">📚 <strong>3 aulas</strong></span>
        <span class="chip">🎯 Simulador interativo</span>
        <span class="chip">❓ Quiz "Pause e Responda"</span>
      </div>
    </section>

    <!-- AULA 1 -->
    <section id="conceito" class="section wrap" aria-labelledby="t1">
      <div class="section__head">
        <div class="section__num">1</div>
        <div>
          <h2 id="t1">Aula 1 — Conceito e estrutura do anel</h2>
          <p>O que é a topologia em anel e como as máquinas ficam organizadas.</p>
        </div>
      </div>

      <div class="card">
        <h3>O que é a topologia em anel?</h3>
        <p>
          Na <strong>topologia em anel</strong>, cada computador (chamado de <strong>nó</strong>)
          é conectado a exatamente <strong>dois vizinhos</strong>, formando um círculo fechado.
          Não existe um "computador central": os dados passam de máquina em máquina até
          chegar ao destino, sempre no mesmo sentido (geralmente horário).
        </p>
        <p>
          Pense em uma <strong>roda de amigos passando um bilhete</strong>: cada pessoa recebe o
          bilhete do vizinho da esquerda e passa para o vizinho da direita, até o bilhete
          chegar em quem ele é destinado.
        </p>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3>Estrutura básica</h3>
          <ul class="clean">
            <li><strong>Nó:</strong> cada dispositivo conectado à rede (PC, impressora, etc.).</li>
            <li><strong>Enlace:</strong> a ligação entre dois nós vizinhos.</li>
            <li><strong>Sentido único:</strong> os dados circulam em uma só direção.</li>
            <li><strong>Sem servidor central:</strong> todos participam da transmissão.</li>
          </ul>
        </div>
        <div class="card">
          <h3>Repetição do sinal</h3>
          <p>
            Cada nó funciona como um <strong>repetidor</strong>: ele recebe o sinal, verifica se a
            mensagem é para ele e, se não for, <strong>reforça e repassa</strong> para o próximo.
          </p>
          <p>
            Isso ajuda o sinal a não enfraquecer em redes maiores, mas cria uma dependência:
            se um nó falha, ele pode interromper o anel.
          </p>
        </div>
      </div>
    </section>

    <!-- AULA 2 -->
    <section id="token" class="section wrap" aria-labelledby="t2">
      <div class="section__head">
        <div class="section__num">2</div>
        <div>
          <h2 id="t2">Aula 2 — Funcionamento com token</h2>
          <p>Como o "token" evita que duas máquinas falem ao mesmo tempo.</p>
        </div>
      </div>

      <div class="card">
        <h3>O que é o Token Ring?</h3>
        <p>
          Para organizar quem pode enviar dados, muitas redes em anel usam um método chamado
          <strong>Token Ring</strong> (anel com token). O <strong>token</strong> é uma pequena
          mensagem especial de "permissão" que fica circulando pelo anel.
        </p>
        <ul class="clean">
          <li><strong>1.</strong> O token vazio circula pelo anel de nó em nó.</li>
          <li><strong>2.</strong> Só quem <strong>está segurando o token</strong> pode transmitir dados.</li>
          <li><strong>3.</strong> O nó anexa os dados ao token e os envia ao destino.</li>
          <li><strong>4.</strong> A mensagem passa pelos nós até chegar ao destinatário.</li>
          <li><strong>5.</strong> Ao terminar, o nó <strong>libera o token</strong> para o próximo usar.</li>
        </ul>
        <p style="margin-top:12px">
          Como só existe <strong>um token</strong>, apenas <strong>uma máquina transmite por vez</strong>.
          Isso evita colisões de dados — a grande vantagem do modelo.
        </p>
      </div>

      <div class="card">
        <h3>Analogia do microfone 🎤</h3>
        <p>
          Imagine uma reunião onde só pode falar quem estiver com o microfone. O microfone (token)
          passa de pessoa em pessoa. Quem quer falar espera o microfone chegar, fala sua mensagem
          e depois passa adiante. <strong>Ninguém fala por cima do outro</strong> — é exatamente
          assim que o token organiza a rede.
        </p>
      </div>
    </section>

    <!-- AULA 3 -->
    <section id="grafico" class="section wrap" aria-labelledby="t3">
      <div class="section__head">
        <div class="section__num">3</div>
        <div>
          <h2 id="t3">Aula 3 — Representação gráfica e fluxo</h2>
          <p>Veja o anel funcionando na prática. Escolha quem envia e para quem.</p>
        </div>
      </div>

      <div class="card">
        <div class="sim" id="sim"></div>
      </div>
    </section>

    <!-- COMPARAÇÃO -->
    <section id="comparacao" class="section wrap" aria-labelledby="tc">
      <div class="section__head">
        <div class="section__num">★</div>
        <div>
          <h2 id="tc">Vantagens, desvantagens e comparação</h2>
          <p>Quando a topologia em anel é uma boa escolha.</p>
        </div>
      </div>

      <div class="card">
        <div class="pros-cons">
          <div class="box ok">
            <h4>✔ Vantagens</h4>
            <ul class="clean">
              <li>Sem colisões de dados (graças ao token).</li>
              <li>Desempenho estável mesmo com tráfego alto.</li>
              <li>Cada nó reforça o sinal (bom para distâncias maiores).</li>
              <li>Fácil de identificar por onde os dados passam.</li>
            </ul>
          </div>
          <div class="box bad">
            <h4>✖ Desvantagens</h4>
            <ul class="clean">
              <li>Se <strong>um nó falha</strong>, o anel inteiro pode parar.</li>
              <li>Adicionar ou remover um nó interrompe a rede.</li>
              <li>Dados podem passar por vários nós até o destino.</li>
              <li>Manutenção mais trabalhosa que a topologia estrela.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Comparando as topologias</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Característica</th>
                <th>Anel</th>
                <th>Estrela</th>
                <th>Barramento</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Ponto central</td><td>Não</td><td>Sim (switch)</td><td>Não (cabo único)</td></tr>
              <tr><td>Falha de 1 nó</td><td>Pode parar a rede</td><td>Não afeta os outros</td><td>Não afeta os outros</td></tr>
              <tr><td>Colisões</td><td>Não (token)</td><td>Controladas pelo switch</td><td>Comuns</td></tr>
              <tr><td>Custo de cabo</td><td>Médio</td><td>Alto</td><td>Baixo</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- QUIZ -->
    <section id="quiz" class="section wrap" aria-labelledby="tq">
      <div class="section__head">
        <div class="section__num">?</div>
        <div>
          <h2 id="tq">Pause e Responda</h2>
          <p>Teste o que você entendeu sobre a topologia em anel.</p>
        </div>
      </div>
      <div class="card">
        <div id="quiz"></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="wrap">
      Material de apoio — Redes de Computadores e Segurança na Nuvem · Semana 3: Topologia em Anel
    </div>
  </footer>
`;

renderRingSimulator(document.getElementById("sim"));
renderQuiz(document.getElementById("quiz"));
