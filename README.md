# Topologia em Anel — Material Interativo + Roteiro de Aula

Site interativo (HTML, CSS e JavaScript puros) para ensinar **Topologia em Anel** em Redes de Computadores, com:

- Explicação do **conceito e estrutura** (Aula 1)
- **Funcionamento com token** / Token Ring (Aula 2)
- **Simulador visual** do anel com pacote animado (Aula 3)
- Tabela de comparação com outras topologias
- Quiz interativo **"Pause e Responda"**

---

## Como rodar

```bash
pnpm install
pnpm dev
```

Depois abra o endereço que aparecer no terminal (ex.: `http://localhost:3000`).

Estrutura dos arquivos:

- `index.html` — página principal
- `src/styles.css` — todo o estilo (tema escuro)
- `src/main.js` — conteúdo das 3 aulas
- `src/ring.js` — o simulador animado do anel
- `src/quiz.js` — o quiz "Pause e Responda"

> Dica: você não precisa saber programar para usar. É só rodar e projetar a tela. O simulador e o quiz são clicáveis durante a aula.

---

## 📋 ROTEIRO DA AULA (100 minutos)

> Fala professor! Este é um roteiro pronto pra você seguir. Os textos em *itálico* são o que você pode **falar em voz alta**. As instruções entre `[colchetes]` são as ações (clicar, projetar, perguntar). Não precisa decorar nada de rede — está tudo explicado aqui.

### ⏱️ Bloco 0 — Abertura (0 a 5 min)

*"Olá, bom dia! Tudo bem com vocês? Hoje a nossa aula é sobre um jeito específico de organizar uma rede de computadores, chamado **Topologia em Anel**. Ao final da aula vocês vão entender: como os computadores ficam ligados em círculo, o que é o tal do 'token', e como os dados viajam de um PC pro outro."*

`[Projete o site na tela inicial — a seção "Topologia em Anel".]`

*"Antes de começar, uma pergunta rápida: alguém aqui já parou pra pensar como um computador conversa com o outro numa rede? Como é que a mensagem sai de uma máquina e chega na outra?"*

`[Deixe 2-3 alunos responderem. Não precisa corrigir nada ainda, só aquecer.]`

---

### ⏱️ Bloco 1 — Aula 1: Conceito e estrutura (5 a 30 min)

`[Clique em "1. Conceito" no menu do site.]`

*"Vamos ao conceito. Na topologia em anel, cada computador — que a gente chama de **nó** — é ligado a exatamente **dois vizinhos**. Um de cada lado. Isso forma um círculo fechado, um anel. Repara que **não existe um computador central mandando em tudo**. Todo mundo participa."*

`[Leia junto com a turma o card "O que é a topologia em anel?".]`

*"Deixa eu dar um exemplo do dia a dia: imaginem uma roda de amigos passando um bilhete. Cada pessoa recebe o bilhete do amigo da esquerda e passa pro amigo da direita. O bilhete vai girando até chegar em quem ele é destinado. É exatamente assim que os dados andam no anel."*

`[Mostre o card "Estrutura básica" e explique cada item:]`

- **Nó** — cada aparelho ligado na rede (um PC, uma impressora...)
- **Enlace** — a "linha" que liga um nó ao outro
- **Sentido único** — os dados sempre andam pra um lado só
- **Sem servidor central** — ninguém manda sozinho

*"Tem mais um detalhe importante: cada nó funciona como um **repetidor**. Ele recebe o sinal, olha se a mensagem é pra ele, e se não for, ele **reforça o sinal e passa pra frente**. Isso é bom porque o sinal não enfraquece. Mas guardem essa ideia, porque ela também tem um lado ruim que a gente vai ver mais pra frente."*

`[⏸️ PAUSE E RESPONDA 1 — pergunte oralmente:]`

> **"Na topologia em anel, existe um computador central que controla a rede? Por quê?"**
> Resposta esperada: *Não. Todos os nós são iguais e a mensagem passa de um pro outro em círculo.*

`[Deixe a turma responder antes de seguir. Reforce a resposta certa.]`

---

### ⏱️ Bloco 2 — Aula 2: Funcionamento com token (30 a 55 min)

`[Clique em "2. Token" no menu.]`

*"Agora vem a parte mais legal. Se todo mundo pode mandar mensagem, como é que a gente evita que dois computadores falem ao mesmo tempo e bagunce tudo? A resposta é o **token**."*

*"O token é uma mensagenzinha especial de **permissão** que fica dando voltas no anel. A regra é simples: **só quem está segurando o token pode transmitir dados**. Quem não tem o token, espera."*

`[Leia com a turma os 5 passos do card "O que é o Token Ring?".]`

*"Repara: como só existe **um** token na rede inteira, só **um** computador transmite por vez. E é por isso que nesse tipo de rede quase não acontece **colisão** de dados — que é quando duas mensagens batem uma na outra e se perdem."*

`[Mostre o card "Analogia do microfone".]`

*"Pensa numa reunião onde só pode falar quem está com o microfone. O microfone passa de mão em mão. Quem quer falar, espera o microfone chegar, fala, e passa adiante. Ninguém fala por cima do outro. O token é esse microfone."*

`[⏸️ PAUSE E RESPONDA 2 — pergunte oralmente:]`

> **"Para que serve o token e por que ele evita colisões?"**
> Resposta esperada: *O token dá permissão para transmitir. Como só existe um, só um PC fala por vez, então as mensagens não se chocam.*

`[Se quiser, use também as perguntas 2 e 3 do quiz do site aqui.]`

---

### ⏱️ Bloco 3 — Aula 3: Representação gráfica e fluxo (55 a 80 min)

`[Clique em "3. Fluxo" no menu — aparece o simulador do anel.]`

*"Agora vamos VER tudo isso acontecendo. Esse desenho é uma rede em anel com 6 computadores."*

`[Deixe a origem em "PC 1" e escolha o destino, por exemplo "PC 4". Clique em "Iniciar transmissão".]`

*"Olhem o que acontece:"*

1. *"Primeiro o **token** (a bolinha laranja) fica circulando, procurando quem quer falar."*
2. *"Quando ele chega no PC 1, o PC 1 pega o token e ganha permissão. Vejam ele ficar destacado."*
3. *"Agora os **dados** (a bolinha azul) saem viajando de nó em nó."*
4. *"Reparem na mensagem: cada PC no caminho olha e diz 'não é pra mim' e **repassa**."*
5. *"Quando chega no PC 4, ele recebe a mensagem. E aí o token é liberado de volta pra rede."*

`[Refaça o simulador com OUTRA origem e destino, de preferência escolhidos pela turma.]`

*"Vamos fazer de novo, mas dessa vez vocês escolhem: quem envia e quem recebe?"*

`[Escolha o que a turma pedir e rode. Isso prende a atenção.]`

`[Agora clique em "Comparação".]`

*"Pra fechar, vamos comparar o anel com outras topologias que talvez vocês já tenham ouvido falar: estrela e barramento."*

`[Mostre os cards de Vantagens e Desvantagens. Enfatize a principal desvantagem:]`

*"Lembram que eu pedi pra guardar a ideia do repetidor? Aqui está o lado ruim: como cada dado passa de nó em nó, **se um computador do anel para de funcionar, ele pode quebrar o anel inteiro** e derrubar a rede toda. É o maior ponto fraco dessa topologia."*

`[Passe rapidamente pela tabela de comparação.]`

`[⏸️ PAUSE E RESPONDA 3 — pergunte oralmente:]`

> **"O que acontece, normalmente, se um único computador do anel falhar?"**
> Resposta esperada: *O anel pode ser interrompido e a rede inteira pode parar.*

---

### ⏱️ Bloco 4 — Quiz "Pause e Responda" (80 a 95 min)

`[Clique em "Quiz" no menu.]`

*"Chegou a hora de testar o que a gente aprendeu. Vou ler cada pergunta e vocês respondem."*

`[Leia a pergunta em voz alta. Peça pra turma votar (letra A, B, C ou D — pode ser levantando a mão). Só depois clique na resposta que a maioria escolheu, para revelar o resultado e a explicação.]`

`[Faça as 5 perguntas assim. No final aparece a pontuação — comemore os acertos.]`

> São 5 perguntas cobrindo: estrutura do anel, função do token, colisões, falha de um nó e sentido dos dados. Tudo que foi visto na aula.

---

### ⏱️ Bloco 5 — Fechamento (95 a 100 min)

*"Pra encerrar, vamos recapitular em três frases:"*

1. *"Na topologia em anel, os computadores ficam ligados em círculo, cada um com dois vizinhos."*
2. *"O **token** é a permissão que circula — só quem tem o token transmite, e por isso não há colisões."*
3. *"A grande vantagem é a organização; a grande desvantagem é que a falha de um nó pode derrubar tudo."*

*"Alguma dúvida? ... Perfeito. Muito obrigado pela participação de vocês, e até a próxima aula!"*

---

## 🎯 Resumão para o professor (cola rápida)

| Conceito | Explicação curta |
|---|---|
| **Nó** | Cada dispositivo da rede |
| **Anel** | Cada nó ligado a 2 vizinhos, em círculo |
| **Token** | Mensagem de permissão que circula; só quem tem transmite |
| **Sem colisão** | Porque só existe 1 token = 1 transmissor por vez |
| **Repetidor** | Cada nó reforça o sinal e repassa |
| **Ponto fraco** | Falha de 1 nó pode parar a rede inteira |

### Perguntas "Pause e Responda" (com respostas)

1. **Quantos vizinhos cada nó tem?** → Exatamente 2.
2. **Para que serve o token?** → Dar permissão para transmitir (1 por vez).
3. **Por que não há colisão?** → Só existe 1 token, então só 1 PC fala por vez.
4. **E se um nó falhar?** → O anel pode ser interrompido e parar a rede.
5. **Em que sentido os dados andam?** → Em uma única direção pelo anel.
