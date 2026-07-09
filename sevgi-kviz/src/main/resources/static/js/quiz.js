document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ambient floating hearts ---------- */
  const heartsBg = document.getElementById('heartsBg');
  const HEART_COUNT = 14;
  for (let i = 0; i < HEART_COUNT; i++) {
    const h = document.createElement('span');
    h.className = 'heart-particle';
    h.textContent = Math.random() > 0.5 ? '❤' : '💗';
    h.style.left = Math.random() * 100 + '%';
    h.style.fontSize = (12 + Math.random() * 16) + 'px';
    h.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    const duration = 9 + Math.random() * 10;
    h.style.animationDuration = duration + 's';
    h.style.animationDelay = (-Math.random() * duration) + 's';
    heartsBg.appendChild(h);
  }

  /* ---------- quiz data ---------- */
  // "dodge: true" belgilangan javob tugmasi - injiq tugma :)
  // u bosilganda 1-2 marta "qochib" ketadi, keyin bosishga ruxsat beradi.
  const questions = [
    {
      q: "Toshkentga kelganingda men bilan nima qilishni xohlaysan? 😊",
      options: [
        { text: "Ovqatlanishga borish ❤️" },
        { text: "Sayr qilish 🥰" },
        { text: "Kino ko'rish 🎬" },
        { text: "Boshqa 😊" }
      ]
    },
    {
      q: "Sanga qanday sovg'a berishimni xohlaysan? 🎁",
      options: [
        { text: "Gul 🌹" },
        { text: "Shirinlik 🍫" },
        { text: "Instagramda aytaman ❤️" }
      ]
    },
    {
      q: "Mani sog'indingmi? 😅",
      options: [
        { text: "Judayam ❤️" },
        { text: "Ha 😊" },
        { text: "Biroz 🤭" },
        { text: "Yo'q 😄", dodge: true }
      ]
    },
    {
      q: "Ko'proq rashk qilishim yoqadimi? 😂",
      options: [
        { text: "Ha ❤️" },
        { text: "Yo'q 😅", dodge: true },
        { text: "Bilmayman 🤭" }
      ]
    },
    {
      q: "Birga sayr qilishni xohlaysanmi va qayerga? 🌇",
      options: [
        { text: "City Mall ❤️" },
        { text: "O'qishing tomonga 🥰" },
        { text: "Keyingi kelganimda 😊" },
        { text: "Yo'q 😄", dodge: true }
      ]
    }
  ];

  const teaseMessages = ["Yo'q endi 😤", "Bunday bo'lmaydi 🙅‍♀️", "Meni ranjitasan-ku 🥺"];

  const answers = new Array(questions.length).fill(null);

  /* ---------- elements ---------- */
  const screenIntro = document.getElementById('screen-intro');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenRecap = document.getElementById('screen-recap');
  const screenFinal = document.getElementById('screen-final');
  const progress = document.getElementById('progress');
  const dots = Array.from(document.querySelectorAll('.dot'));

  const qCountEl = document.getElementById('qCount');
  const qTextEl = document.getElementById('qText');
  const qOptionsEl = document.getElementById('qOptions');

  let currentQ = 0;

  function showScreen(el) {
    [screenIntro, screenQuiz, screenRecap, screenFinal].forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  }

  function updateDots() {
    dots.forEach((d, i) => {
      d.classList.toggle('done', i < currentQ);
      d.classList.toggle('current', i === currentQ);
    });
  }

  function renderQuestion(index) {
    const data = questions[index];
    qCountEl.textContent = `Savol ${index + 1} / ${questions.length}`;
    qTextEl.textContent = data.q;
    qOptionsEl.innerHTML = '';

    data.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = opt.text;

      let dodgeCount = 0;
      const maxDodges = 2;

      btn.addEventListener('click', (e) => {
        if (opt.dodge && dodgeCount < maxDodges) {
          dodgeCount++;
          dodgeButton(btn);
          showTease(btn);
          return;
        }
        selectOption(btn, index, opt.text);
      });

      qOptionsEl.appendChild(btn);
    });

    updateDots();
  }

  function dodgeButton(btn) {
    const container = qOptionsEl;
    const maxX = Math.max(0, container.clientWidth - btn.clientWidth - 8);
    const newX = Math.random() * maxX * (Math.random() > 0.5 ? 1 : -0.4);
    const newY = (Math.random() * 24 - 12);
    btn.classList.add('dodging');
    btn.style.transform = `translate(${newX}px, ${newY}px)`;
    setTimeout(() => {
      btn.style.transform = 'translate(0,0)';
    }, 550);
  }

  function showTease(btn) {
    const bubble = document.createElement('div');
    bubble.className = 'tease-bubble';
    bubble.textContent = teaseMessages[Math.floor(Math.random() * teaseMessages.length)];
    document.body.appendChild(bubble);

    const rect = btn.getBoundingClientRect();
    bubble.style.left = (rect.left + rect.width / 2 - 60) + 'px';
    bubble.style.top = (rect.top - 42 + window.scrollY) + 'px';

    requestAnimationFrame(() => bubble.classList.add('show'));
    setTimeout(() => {
      bubble.classList.remove('show');
      setTimeout(() => bubble.remove(), 300);
    }, 1100);
  }

  function selectOption(btn, index, text) {
    Array.from(qOptionsEl.children).forEach(c => c.classList.remove('selected'));
    btn.classList.add('selected');
    answers[index] = text;

    setTimeout(() => {
      if (index < questions.length - 1) {
        currentQ = index + 1;
        renderQuestion(currentQ);
      } else {
        buildRecap();
        showScreen(screenRecap);
        progress.style.display = 'none';
      }
    }, 420);
  }

  function buildRecap() {
    const list = document.getElementById('recapList');
    list.innerHTML = '';
    questions.forEach((q, i) => {
      const item = document.createElement('div');
      item.className = 'recap-item';
      item.style.animationDelay = (i * 0.18) + 's';

      const qEl = document.createElement('p');
      qEl.className = 'recap-q';
      qEl.textContent = q.q;

      const aEl = document.createElement('p');
      aEl.className = 'recap-a';
      aEl.textContent = answers[i] || '—';

      item.appendChild(qEl);
      item.appendChild(aEl);
      list.appendChild(item);
    });
  }

  function playFinal() {
    showScreen(screenFinal);
    const lines = Array.from(document.querySelectorAll('.final-line'));
    const heart = document.getElementById('bigHeart');
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add('in'), 350 * i + 200);
    });
    setTimeout(() => heart.classList.add('in'), 350 * lines.length + 400);
  }

  /* ---------- wire up buttons ---------- */
  document.getElementById('startBtn').addEventListener('click', () => {
    progress.style.display = 'flex';
    currentQ = 0;
    renderQuestion(currentQ);
    showScreen(screenQuiz);
  });

  document.getElementById('continueBtn').addEventListener('click', playFinal);
});
