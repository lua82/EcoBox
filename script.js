
/* ==========================================
   1. NAVEGACIÓN Y APERTURA DE ECOBOX
========================================== */

let boxOpened = false;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'challenge') renderMissions();
  if (id === 'quiz' && !quizStarted) startQuiz();
}

function openBox() {
  if (boxOpened) return;

  boxOpened = true;

  const box = document.getElementById('bigBoxButton');
  const instruction = document.getElementById('clickInstruction');

  box.classList.add('opened');
  instruction.textContent = '¡PREPARANDO TU EXPERIENCIA ECOBOX!';

  setTimeout(() => {
    showScreen('explore');
  }, 1000);
}


/* ==========================================
   2. LIBRO: CAPÍTULOS INTERACTIVOS
========================================== */

const chapters = [
  {
    title: 'El mundo de los microplásticos',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=85',
    intro: 'Los microplásticos son partículas de plástico cuyo tamaño es inferior a 5 milímetros. Pueden ser tan pequeños que no se distinguen fácilmente a simple vista.',
    body: 'Estas partículas presentan diferentes formas: fragmentos, fibras, películas y pequeñas esferas. Su composición depende del tipo de plástico del que proceden. Debido a su tamaño, pueden distribuirse por diferentes ambientes.',
    highlight: 'La palabra microplástico no describe un único material, sino un conjunto de partículas plásticas pequeñas con diferentes características.',
    facts: [
      ['📏', 'Menos de 5 mm'],
      ['🔬', 'Distintas formas'],
      ['🌎', 'Presencia ambiental']
    ],
    question: '¿Cuál es el tamaño que define a los microplásticos?',
    options: ['Menos de 5 mm', 'Más de 10 cm', 'Exactamente 1 metro'],
    correct: 0,
    explanation: '¡Correcto! Se considera microplástico a las partículas plásticas de menos de 5 milímetros.'
  },
  {
    title: '¿Cómo se originan?',
    image: 'https://www.fundacionaquae.org/wp-content/uploads/2022/03/microplasticos-tipos-1024x683.jpg',
    intro: 'Los microplásticos pueden tener dos grandes orígenes: algunos se producen directamente en tamaños pequeños y otros aparecen cuando objetos plásticos más grandes se fragmentan.',
    body: 'Los primarios se fabrican en tamaños pequeños o se liberan como partículas durante ciertos usos. Los secundarios se forman por el desgaste y la fragmentación de objetos como envases, bolsas y otros residuos.',
    highlight: 'El sol, el calor, el movimiento del agua y el desgaste pueden contribuir a la fragmentación de los plásticos.',
    facts: [
      ['🏭', 'Origen primario'],
      ['🧩', 'Origen secundario'],
      ['☀️', 'Fragmentación']
    ],
    question: 'Una bolsa abandonada se fragmenta con el tiempo. ¿Qué tipo de microplástico puede generar?',
    options: ['Primario', 'Secundario', 'Ninguno'],
    correct: 1,
    explanation: '¡Exacto! Se trata de microplásticos secundarios, que proceden de la fragmentación de objetos plásticos más grandes.'
  },
  {
    title: 'Las fuentes que no imaginabas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=85',
    intro: 'No todos los microplásticos proceden de botellas y bolsas. Algunas actividades cotidianas también pueden liberar pequeñas partículas.',
    body: 'Entre las fuentes estudiadas están las fibras de prendas sintéticas, el desgaste de neumáticos y la fragmentación de productos plásticos. Por eso, el problema no se limita a los residuos que podemos ver en las calles.',
    highlight: 'Algunas prendas de poliéster, nailon y acrílico pueden liberar microfibras durante su uso y lavado.',
    facts: [
      ['👕', 'Fibras textiles'],
      ['🚗', 'Desgaste de neumáticos'],
      ['📦', 'Residuos plásticos']
    ],
    question: '¿Cuál de estas actividades puede liberar microfibras?',
    options: ['Lavar una prenda sintética', 'Escribir en papel', 'Leer un libro'],
    correct: 0,
    explanation: '¡Muy bien! Algunas prendas sintéticas pueden liberar fibras durante el lavado y el uso.'
  },
  {
    title: 'Un viaje por el planeta',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&auto=format&fit=crop&q=85',
    intro: 'Los microplásticos se han detectado en diferentes ambientes, como océanos, ríos, lagos, suelos y aire.',
    body: 'Las partículas pueden transportarse por corrientes de agua, viento, escorrentía y aguas residuales. Su distribución depende de las características del lugar y de las fuentes de contaminación.',
    highlight: 'Un residuo plástico mal gestionado puede fragmentarse y sus partículas pueden ser transportadas hacia otros espacios naturales.',
    facts: [
      ['🌊', 'Ambientes acuáticos'],
      ['🌱', 'Suelos'],
      ['🌬️', 'Aire']
    ],
    question: '¿Los microplásticos se encuentran únicamente en el océano?',
    options: ['Sí', 'No'],
    correct: 1,
    explanation: '¡Correcto! También se han detectado en ríos, lagos, suelos y ambientes atmosféricos.'
  },
  {
    title: '¿Qué ocurre con los ecosistemas?',
    image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1200&auto=format&fit=crop&q=85',
    intro: 'La presencia de microplásticos representa un desafío para los ecosistemas porque distintos organismos pueden entrar en contacto con estas partículas.',
    body: 'Algunos organismos pueden ingerirlas al confundirlas con alimento. Los posibles efectos dependen de factores como la especie, el tamaño de las partículas, su composición y la cantidad de exposición.',
    highlight: 'Investigar los microplásticos permite comprender mejor cómo se relacionan con la biodiversidad y las redes alimentarias.',
    facts: [
      ['🐟', 'Fauna acuática'],
      ['🦪', 'Organismos filtradores'],
      ['🌿', 'Ecosistemas']
    ],
    question: '¿Algunos organismos pueden ingerir microplásticos?',
    options: ['Sí', 'No'],
    correct: 0,
    explanation: 'Así es. La ingestión de microplásticos se ha documentado en diferentes organismos.'
  },
  {
    title: 'Salud, ciencia y futuro',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&auto=format&fit=crop&q=85',
    intro: 'La investigación científica también estudia la exposición humana a los microplásticos y sus posibles efectos.',
    body: 'Se han identificado partículas plásticas en algunas muestras humanas. Sin embargo, todavía se investigan los niveles de exposición, sus posibles efectos a largo plazo y la relación con diferentes condiciones de salud.',
    highlight: 'Es importante diferenciar entre lo que ya se ha observado en estudios y lo que todavía necesita más evidencia científica.',
    facts: [
      ['🧪', 'Investigación'],
      ['📚', 'Evidencia científica'],
      ['🔎', 'Preguntas abiertas']
    ],
    question: '¿La ciencia conoce por completo todos los efectos de los microplásticos en la salud?',
    options: ['Sí, todos están confirmados', 'No, la investigación continúa'],
    correct: 1,
    explanation: '¡Muy bien! Es un campo de investigación activo y todavía existen preguntas por resolver.'
  }
];

let currentChapter = 0;

function renderChapterNavigation() {
  document.getElementById('chapterNavigation').innerHTML =
    chapters.map((chapter, index) => `
      <button
        class="chapter-tab ${index === currentChapter ? 'selected' : ''}"
        onclick="showChapter(${index})"
      >
        ${String(index + 1).padStart(2, '0')} · ${chapter.title.split(' ')[0]}
      </button>
    `).join('');
}

function showChapter(index) {
  currentChapter = index;

  const chapter = chapters[index];

  document.getElementById('chapterCounter').textContent =
    `CAPÍTULO ${String(index + 1).padStart(2, '0')} DE 06`;

  document.getElementById('chapterProgress').style.width =
    `${((index + 1) / chapters.length) * 100}%`;

  document.getElementById('chapterContent').innerHTML = `
    <div class="chapter-image">
      <img src="${chapter.image}" alt="${chapter.title}">
      <span>${chapter.title}</span>
    </div>

    <div class="chapter-body">
      <span class="eyebrow">CAPÍTULO ${String(index + 1).padStart(2, '0')}</span>
      <h3>${chapter.title}</h3>
      <p>${chapter.intro}</p>
      <p>${chapter.body}</p>

      <div class="chapter-highlight">
        <strong>✨ DATO IMPORTANTE</strong>
        <p>${chapter.highlight}</p>
      </div>

      <div class="chapter-facts">
        ${chapter.facts.map(fact => `
          <div class="chapter-fact">
            <span>${fact[0]}</span>
            <strong>${fact[1]}</strong>
          </div>
        `).join('')}
      </div>

      <div class="chapter-question">
        <h4>🧠 Comprueba lo aprendido</h4>
        <p>${chapter.question}</p>
        ${chapter.options.map((option, i) => `
          <button onclick="checkChapter(${i}, this)">${option}</button>
        `).join('')}
        <div class="chapter-answer" id="chapterAnswer"></div>
      </div>
    </div>
  `;

  renderChapterNavigation();
  const nextButton = document.getElementById('nextChapter');

if (nextButton) {
  nextButton.style.display =
    index === chapters.length - 1 ? 'none' : 'inline-flex';
}
  
}

function checkChapter(answer, button) {
  const chapter = chapters[currentChapter];
  const buttons = button.parentElement.querySelectorAll('button');

  buttons.forEach(btn => btn.disabled = true);

  const answerBox = document.getElementById('chapterAnswer');

  if (answer === chapter.correct) {
    answerBox.textContent = '✅ ¡Correcto! ' + chapter.explanation;
  } else {
    answerBox.textContent = '💡 Sigue aprendiendo. ' + chapter.explanation;
  }
}

function changeChapter(direction) {
  let next = currentChapter + direction;

  if (next < 0) next = 0;
  if (next >= chapters.length) next = chapters.length - 1;

  showChapter(next);

  document.getElementById('chapterContent').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

showChapter(0);


/* ==========================================
   3. CARTA: SOBRES Y CURIOSIDADES
========================================== */

const facts = [
  {
    icon: '💧',
    title: 'El viaje del agua',
    teaser: '¿A dónde pueden llegar?',
    text: 'Los microplásticos se han detectado en océanos, ríos y lagos. Pueden llegar mediante aguas residuales, escorrentía y residuos que no se gestionan adecuadamente.'
  },
  {
    icon: '👕',
    title: 'Tu ropa también cuenta',
    teaser: 'Una fuente inesperada',
    text: 'Algunas prendas sintéticas, como las de poliéster o nailon, pueden liberar fibras durante su fabricación, uso y lavado.'
  },
  {
    icon: '🚗',
    title: 'Una fuente inesperada',
    teaser: 'No todo viene de los envases',
    text: 'El desgaste de los neumáticos genera partículas que contienen materiales del neumático y pueden dispersarse en el ambiente.'
  },
  {
    icon: '🌬️',
    title: 'También están en el aire',
    teaser: 'Lo que no vemos',
    text: 'Se han detectado partículas plásticas suspendidas en el aire, tanto en ambientes exteriores como interiores.'
  },
  {
    icon: '🔬',
    title: 'Un desafío científico',
    teaser: 'Preguntas por resolver',
    text: 'Los investigadores estudian cómo influyen el tamaño, la forma y la composición de las partículas en los organismos y en la salud humana.'
  },
  {
    icon: '⏳',
    title: 'Un proceso lento',
    teaser: 'El plástico no desaparece fácilmente',
    text: 'Muchos plásticos se fragmentan por acción de la luz solar, el calor y el desgaste, lo que puede generar partículas cada vez más pequeñas.'
  }
];

function renderEnvelopes() {
  document.getElementById('envelopeGrid').innerHTML =
    facts.map((fact, index) => `
      <button class="envelope-card" onclick="toggleEnvelope(${index})">
        <span class="envelope">✉️</span>
        <h3>${fact.title}</h3>
        <small>${fact.teaser}</small>
        <p>${fact.text}</p>
      </button>
    `).join('');
}

function toggleEnvelope(index) {
  const cards = document.querySelectorAll('.envelope-card');
  const card = cards[index];

  card.classList.toggle('open');

  card.querySelector('.envelope').textContent =
    card.classList.contains('open') ? '💌' : '✉️';
}

renderEnvelopes();


/* ==========================================
   4. ALTERNATIVAS: ELIGE UNA SITUACIÓN
========================================== */

const situations = [
  {
    icon: '🥤',
    title: 'Bebidas',
    heading: 'Llevas agua al colegio',
    problem: 'Cada día compras una botella de agua desechable. ¿Qué podrías cambiar?',
    solution: 'Utilizar una botella reutilizable adecuada para alimentos y mantenerla limpia. Así puedes reducir la necesidad de comprar botellas desechables.'
  },
  {
    icon: '👕',
    title: 'Ropa',
    heading: 'Necesitas una prenda nueva',
    problem: 'Encuentras una prenda fabricada con fibras sintéticas. ¿Qué deberías considerar?',
    solution: 'Revisa su composición, durabilidad y utilidad. También puedes prolongar la vida de tu ropa, repararla y evitar compras innecesarias. Algunas fibras sintéticas pueden liberar microfibras.'
  },
  {
    icon: '🛍️',
    title: 'Compras',
    heading: 'Vas a una tienda',
    problem: 'Te ofrecen una bolsa de plástico para llevar una compra pequeña.',
    solution: 'Puedes llevar una bolsa reutilizable o rechazar la bolsa si no la necesitas. Reducir los empaques innecesarios es una buena forma de prevenir residuos.'
  },
  {
    icon: '🧴',
    title: 'Hogar',
    heading: 'Se terminó un producto',
    problem: 'Necesitas comprar nuevamente un producto de limpieza.',
    solution: 'Cuando sea seguro y esté disponible, puedes comparar opciones de recarga o envases reutilizables. Revisa también cómo gestionar el envase vacío.'
  },
  {
    icon: '🗑️',
    title: 'Residuos',
    heading: 'Tienes un envase vacío',
    problem: 'Terminaste una bebida y necesitas desechar el envase.',
    solution: 'Identifica el material y sepáralo según las reglas de reciclaje de tu localidad. No todos los plásticos se aceptan en todos los sistemas de reciclaje.'
  }
];

function renderSituations() {
  document.getElementById('situationGrid').innerHTML =
    situations.map((item, index) => `
      <button class="situation-card" onclick="chooseSituation(${index})">
        <span>${item.icon}</span>
        ${item.title}
      </button>
    `).join('');
}

function chooseSituation(index) {
  const item = situations[index];

  document.querySelectorAll('.situation-card').forEach((card, i) => {
    card.classList.toggle('selected', i === index);
  });

  document.getElementById('alternativeResult').innerHTML = `
    <span class="eyebrow">SITUACIÓN ${String(index + 1).padStart(2, '0')}</span>
    <h3>${item.icon} ${item.heading}</h3>
    <p>${item.problem}</p>

    <div class="solution-box">
      <strong>🌱 Una alternativa posible</strong>
      <p>${item.solution}</p>
    </div>
  `;
}

renderSituations();


/* ==========================================
   5. RETO DE 7 DÍAS
========================================== */

const missions = [
  {
    icon: '🔎',
    title: 'Detective del plástico',
    description: 'Observa tu entorno como un investigador.',
    task: 'Identifica cinco objetos plásticos que utilizas durante el día. Investiga cuáles podrían liberar partículas por desgaste o fragmentación y explica por qué.'
  },
  {
    icon: '💧',
    title: 'El viaje de un residuo',
    description: 'Sigue el posible recorrido de un residuo.',
    task: 'Elige un residuo plástico de casa. Describe o dibuja una ruta posible desde que se desecha hasta cómo podría llegar al ambiente si no se gestiona correctamente.'
  },
  {
    icon: '📊',
    title: 'Auditoría de residuos',
    description: 'Analiza los residuos de tu entorno.',
    task: 'Durante un periodo de observación, registra los residuos plásticos que encuentres en casa o en el colegio. Clasifícalos y propón una forma de reducirlos. No manipules residuos peligrosos o sucios.'
  },
  {
    icon: '👕',
    title: 'Misión textil',
    description: 'Investiga los materiales de tu ropa.',
    task: 'Revisa las etiquetas de tres prendas. Anota su composición, identifica si contienen fibras sintéticas y explica su posible relación con la liberación de microfibras.'
  },
  {
    icon: '🌱',
    title: 'Reto de alternativas',
    description: 'Cambia un hábito cotidiano.',
    task: 'Elige un producto desechable que utilices frecuentemente. Encuentra una alternativa reutilizable o con menos empaque y compara sus ventajas y limitaciones.'
  },
  {
    icon: '🔬',
    title: 'Eco-investigador',
    description: 'Busca evidencia científica.',
    task: 'Encuentra una noticia o investigación confiable sobre microplásticos. Escribe la fuente, el año y una conclusión importante. Diferencia los resultados científicos de las opiniones.'
  },
  {
    icon: '💡',
    title: 'Diseña el cambio',
    description: 'Convierte tus ideas en una propuesta.',
    task: 'Diseña una propuesta para reducir residuos plásticos o la liberación de microplásticos en casa, colegio o comunidad. Explica el problema, tu solución y cómo medirías los resultados.'
  }
];

let completedMissions = JSON.parse(
  localStorage.getItem('ecoboxCompleted') || '[]'
);

let missionNotes = JSON.parse(
  localStorage.getItem('ecoboxNotes') || '{}'
);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

function renderMissions() {
  document.getElementById('missionList').innerHTML =
    missions.map((mission, index) => {
      const done = completedMissions.includes(index);

      return `
        <article class="mission-card ${done ? 'completed' : ''}">
          <div class="mission-top">
            <span class="mission-day">DÍA ${index + 1} / 7</span>
            <span class="mission-icon">${mission.icon}</span>
          </div>

          <h3>${mission.title}</h3>
          <p>${mission.description}</p>

          <div class="mission-task">
            <strong>🎯 TU MISIÓN</strong><br>
            ${mission.task}
          </div>

          <textarea
            id="missionNote${index}"
            placeholder="Escribe tu reflexión o evidencia..."
            ${done ? 'disabled' : ''}
          >${escapeHTML(missionNotes[index] || '')}</textarea>

          <button
            class="complete-btn"
            onclick="completeMission(${index})"
            ${done ? 'disabled' : ''}
          >
            ${done ? '✓ MISIÓN COMPLETADA' : 'COMPLETAR MISIÓN'}
          </button>
        </article>
      `;
    }).join('');

  updateProgress();
}

function completeMission(index) {
  const note = document.getElementById(`missionNote${index}`).value.trim();

  if (note.length < 10) {
    alert('Escribe una pequeña reflexión o evidencia antes de completar la misión.');
    return;
  }

  missionNotes[index] = note;

  if (!completedMissions.includes(index)) {
    completedMissions.push(index);
  }

  localStorage.setItem('ecoboxCompleted', JSON.stringify(completedMissions));
  localStorage.setItem('ecoboxNotes', JSON.stringify(missionNotes));

  renderMissions();
}

function updateProgress() {
  const count = completedMissions.length;

  document.getElementById('progressText').textContent =
    `${count} de 7 misiones completadas`;

  document.getElementById('progressBar').style.width =
    `${(count / 7) * 100}%`;

  document.getElementById('certificate').classList.toggle(
    'show',
    count === 7
  );
}

renderMissions();


/* ==========================================
   6. ECOQUIZ
========================================== */

const questions = [
  {
    question: 'Una botella queda expuesta al sol y comienza a fragmentarse. ¿Qué podría ocurrir?',
    options: [
      'Puede generar microplásticos secundarios.',
      'Se convierte inmediatamente en agua.',
      'Desaparece sin dejar residuos.'
    ],
    correct: 0,
    explanation: 'La luz solar y otros factores ambientales pueden contribuir a la fragmentación del plástico.'
  },
  {
    question: 'Una persona lava una prenda de poliéster. ¿Qué fenómeno podría ocurrir?',
    options: [
      'La prenda se convierte en papel.',
      'Puede liberar microfibras.',
      'El agua elimina toda contaminación.'
    ],
    correct: 1,
    explanation: 'Algunas prendas sintéticas pueden liberar microfibras durante el lavado y el uso.'
  },
  {
    question: 'Un estudiante encuentra partículas plásticas en un río. ¿Qué indica este hallazgo?',
    options: [
      'Que todos los ríos tienen la misma contaminación.',
      'Que los microplásticos pueden estar presentes en ambientes acuáticos.',
      'Que las partículas solo existen en océanos.'
    ],
    correct: 1,
    explanation: 'Se han detectado microplásticos en diferentes ambientes acuáticos.'
  },
  {
    question: 'Una familia quiere reducir su consumo de plástico. ¿Qué decisión puede ayudar?',
    options: [
      'Utilizar más productos desechables.',
      'Abandonar residuos en espacios naturales.',
      'Incorporar productos reutilizables cuando sean adecuados.'
    ],
    correct: 2,
    explanation: 'Los productos reutilizables pueden reducir la necesidad de comprar artículos desechables.'
  },
  {
    question: 'Una noticia afirma que los microplásticos causan una enfermedad específica en todas las personas. ¿Qué debería hacer un investigador?',
    options: [
      'Aceptar la afirmación sin revisarla.',
      'Buscar evidencia científica y evaluar los estudios.',
      'Compartirla inmediatamente.'
    ],
    correct: 1,
    explanation: 'Es importante distinguir entre resultados científicos, hipótesis y afirmaciones que todavía no tienen suficiente evidencia.'
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let quizStarted = false;
let quizFinished = false;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  quizStarted = true;
  quizFinished = false;

  document.getElementById('quizContainer').classList.remove('hidden');
  document.getElementById('quizResult').classList.add('hidden');

  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];

  answered = false;

  document.getElementById('questionNumber').textContent =
    `PREGUNTA ${String(currentQuestion + 1).padStart(2, '0')} / 05`;

  document.getElementById('quizScore').textContent =
    `⭐ ${score} puntos`;

  document.getElementById('quizProgress').style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  document.getElementById('questionText').textContent = q.question;

  document.getElementById('answerOptions').innerHTML =
    q.options.map((option, index) => `
      <button class="answer-btn" onclick="selectAnswer(${index})">
        ${String.fromCharCode(65 + index)}. ${option}
      </button>
    `).join('');

  document.getElementById('feedback').className = 'feedback';
  document.getElementById('nextQuestion').disabled = true;
  document.getElementById('nextQuestion').textContent =
    currentQuestion === 4 ? 'Ver resultado →' : 'Continuar →';
}

function selectAnswer(index) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.correct) button.classList.add('correct');
    if (i === index && index !== q.correct) button.classList.add('incorrect');
  });

  const feedback = document.getElementById('feedback');

  if (index === q.correct) {
    score++;
    feedback.className = 'feedback show good';
    feedback.textContent = '✓ ¡Correcto! ' + q.explanation;
  } else {
    feedback.className = 'feedback show bad';
    feedback.textContent = '¡Sigue aprendiendo! ' + q.explanation;
  }

  document.getElementById('quizScore').textContent =
    `⭐ ${score} puntos`;

  document.getElementById('nextQuestion').disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  quizFinished = true;

  document.getElementById('quizContainer').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');
  document.getElementById('quizProgress').style.width = '100%';

  document.getElementById('finalScore').textContent =
    `Obtuviste ${score} de 5 respuestas correctas.`;

  let message;

  if (score === 5) {
    message = '¡Increíble! Eres un verdadero EcoExperto. 🌎';
  } else if (score >= 3) {
    message = '¡Buen trabajo! Ya sabes mucho sobre los microplásticos.';
  } else {
    message = 'Cada pregunta es una oportunidad para aprender. ¡Inténtalo otra vez!';
  }

  document.getElementById('finalMessage').textContent = message;
}

function restartQuiz() {
  startQuiz();
}
/* ==========================================
   7. PANTALLA FINAL Y REINICIO
========================================== */

function finishEcoBox() {
    showScreen('finalScreen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartEcoBox() {
  // Ocultar todas las pantallas
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Mostrar la pantalla de inicio
  const home = document.getElementById('home');

  if (home) {
    home.classList.add('active');
  } else {
    console.error('No se encontró la pantalla con id="home".');
  }

  // Reiniciar el capítulo
  currentChapter = 0;
  showChapter(0);

  // Volver al inicio de la página
  window.scrollTo({ top: 0, behavior: 'smooth' });
}