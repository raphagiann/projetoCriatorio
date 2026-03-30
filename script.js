// ── PARTÍCULAS DO HERO ──
(function () {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = Math.floor((W * H) / 18000);
    particles = Array.from({ length: count }, () => ({
      x:      Math.random() * W,
      y:      Math.random() * H,
      r:      Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      alpha:  Math.random() * 0.35 + 0.05
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

// ── PLAYER DE VÍDEO ──
function toggleVideo(el) {
  const thumb = el.closest('.video-thumb');
  const video = thumb.querySelector('.video-player');
  if (!video) return;
  if (video.paused) {
    document.querySelectorAll('.video-player').forEach(v => {
      if (v !== video) { v.pause(); v.closest('.video-thumb').classList.remove('playing'); }
    });
    video.play();
    thumb.classList.add('playing');
  } else {
    video.pause();
    thumb.classList.remove('playing');
  }
  video.addEventListener('ended', () => thumb.classList.remove('playing'), { once: true });
}

function selectGridVideo(gridCard) {
  const featured = document.querySelector('.video-featured .video-thumb');

  // Pausa tudo
  document.querySelectorAll('.video-player').forEach(v => {
    v.pause();
    v.closest('.video-thumb').classList.remove('playing');
  });

  // Troca título e descrição (mantém badge "Em Destaque" no featured)
  const featTitle = featured.querySelector('.video-title').textContent;
  const featDesc  = featured.querySelector('.video-desc').textContent;
  const gridTitle = gridCard.querySelector('.video-title').textContent;
  const gridDesc  = gridCard.querySelector('.video-desc').textContent;
  featured.querySelector('.video-title').textContent = gridTitle;
  featured.querySelector('.video-desc').textContent  = gridDesc;
  gridCard.querySelector('.video-title').textContent = featTitle;
  gridCard.querySelector('.video-desc').textContent  = featDesc;

  // Troca os elementos <video>
  const featVid = featured.querySelector('.video-player');
  const gridVid = gridCard.querySelector('.video-player');
  const featSrc = featVid ? featVid.getAttribute('src') : null;
  const gridSrc = gridVid ? gridVid.getAttribute('src') : null;

  if (featVid) featVid.remove();
  if (gridVid) gridVid.remove();

  function makeVideo(src) {
    const v = document.createElement('video');
    v.className = 'video-player';
    v.setAttribute('src', src);
    v.setAttribute('playsinline', '');
    v.setAttribute('preload', 'metadata');
    return v;
  }

  if (gridSrc) {
    const v = makeVideo(gridSrc);
    featured.insertBefore(v, featured.firstChild);
    v.play();
    featured.classList.add('playing');
    v.addEventListener('ended', () => featured.classList.remove('playing'), { once: true });
  }

  if (featSrc) {
    gridCard.insertBefore(makeVideo(featSrc), gridCard.firstChild);
  }
}

// ── CATÁLOGO ──
const bicudos = [
  { id: 2,  nome: "Big Boss",       sexo: "Macho", pai: "Juninho CLB",   mae: "Big 131 CLB",    foto: "big-boss.jpg",      genealogia: `<img src="big-boss.jpg"      alt="Big Boss"      style="width:100%;border-radius:4px;">` },
  { id: 3,  nome: "Big Impacto",    sexo: "Macho", pai: "De La Cruz",    mae: "Big Traira",     foto: "big-impacto.jpg",   genealogia: `<img src="big-impacto.jpg"   alt="Big Impacto"   style="width:100%;border-radius:4px;">` },
  { id: 7,  nome: "Colossu",       sexo: "Macho", pai: "Rodhes",        mae: "Cassaca",        foto: "colossu.jpg",       genealogia: `<img src="colossu.jpg"       alt="Colossus"      style="width:100%;border-radius:4px;">` },
  { id: 9,  nome: "Fininho",        sexo: "Macho", pai: "De La Cruz",    mae: "Dama de Ouro",   foto: "fininho.jpg",       genealogia: `<img src="fininho.jpg"       alt="Fininho"       style="width:100%;border-radius:4px;">` },
  { id: 11, nome: "Magia Negra",    sexo: "Macho", pai: "Jeferson",      mae: "Afortunada",     foto: "magia-negra.jpg",   genealogia: `<img src="magia-negra.jpg"   alt="Magia Negra"   style="width:100%;border-radius:4px;">` },
  { id: 12, nome: "Nego Drama",     sexo: "Macho", pai: "Madrid",        mae: "Avani BLC",      foto: "nego-drama.jpg",    genealogia: `<img src="nego-drama.jpg"    alt="Nego Drama"    style="width:100%;border-radius:4px;">` },
  { id: 15, nome: "Romário",        sexo: "Macho", pai: "Fortuna",       mae: "Penata",         foto: "romario.jpg",       genealogia: `<img src="romario.jpg"       alt="Romário"       style="width:100%;border-radius:4px;">` },
  { id: 16, nome: "Madrilenho",     sexo: "Macho", pai: "Madrid",        mae: "Amsterdã",       foto: "madrileno.jpg",     genealogia: `<img src="madrileno.jpg"     alt="Madrilenho"    style="width:100%;border-radius:4px;">` },
  { id: 17, nome: "Toretto",        sexo: "Macho", pai: "Van Diesel",    mae: "Goyatriz Filha", foto: "toretto.jpg",       genealogia: `<img src="toretto.jpg"       alt="Toretto"       style="width:100%;border-radius:4px;">` },
  { id: 18, nome: "Big 245",        sexo: "Macho", pai: "Bigode Grosso", mae: "Manu V.C.",      foto: "big-245.jpg",       genealogia: `<img src="big-245.jpg"       alt="Big 245"       style="width:100%;border-radius:4px;">` },
  { id: 19, nome: "Big Atraente",   sexo: "Macho", pai: "Bigode Grosso", mae: "Sedutora",       foto: "big-atraente.jpg",  genealogia: `<img src="big-atraente.jpg"  alt="Big Atraente"  style="width:100%;border-radius:4px;">` },
  { id: 20, nome: "Rei Monet",      sexo: "Macho", pai: "Muralha II",    mae: "Fontana",        foto: "rei-monet.jpg",     genealogia: `<img src="rei-monet.jpg"     alt="Rei Monet"     style="width:100%;border-radius:4px;">` },
  { id: 21, nome: "Tracado",         sexo: "Macho", pai: "Van Diesel",    mae: "Riscada",        foto: "tracado.jpg",       genealogia: `<img src="tracado.jpg"       alt="Tracado"       style="width:100%;border-radius:4px;">` }
];

function renderCatalogo() {
  document.getElementById("catalogoGrid").innerHTML = bicudos.map(b => `
    <div class="bird-card">
      <div class="bird-foto">
        ${b.foto
          ? `<img src="${b.foto}" alt="${b.nome}" />`
          : `<div class="bird-foto-placeholder">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                 <path d="M12 2C9 2 6 4 6 7c0 2 1 3.5 2.5 4.5C5 13 3 16 3 19h18c0-3-2-6-5.5-7.5C17 10.5 18 9 18 7c0-3-3-5-6-5z"/>
               </svg>
               <span>Foto não disponível</span>
             </div>`
        }
      </div>
      <div class="bird-body">
        <div class="bird-header">
          <h3>${b.nome}</h3>
          <span class="badge-sexo ${b.sexo === 'Macho' ? 'badge-macho' : 'badge-femea'}">${b.sexo}</span>
        </div>
        <div class="bird-meta">
          <div class="bird-meta-row">
            <span class="label">Pai</span>
            <span class="value">${b.pai}</span>
          </div>
          <div class="bird-meta-row">
            <span class="label">Mãe</span>
            <span class="value">${b.mae}</span>
          </div>
        </div>
        <button class="btn-genealogia" onclick="openModal(${b.id})">Ver Genealogia</button>
      </div>
    </div>
  `).join("");
}

function openModal(id) {
  const bird = bicudos.find(b => b.id === id);
  if (!bird) return;
  document.getElementById("modal-title").textContent = bird.nome;
  document.getElementById("modal-content").innerHTML = bird.genealogia
    ?? `<div class="genealogia-placeholder">
          <strong>Árvore genealógica em breve</strong>
          Os dados de ${bird.nome} serão disponibilizados em breve.
        </div>`;
  document.getElementById("modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(event) {
  if (event?.type === "click" && !event.target.classList.contains("modal-overlay")) return;
  document.getElementById("modal").classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function toggleTheme() {
  const html = document.documentElement;
  html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  localStorage.setItem('theme', html.getAttribute('data-theme'));
}

// Aplica tema salvo
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

function toggleMenu() {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  btn.classList.toggle("open");
  links.classList.toggle("open");
}

// ── TELA CHEIA ──
function goFullscreen(btn) {
  const video = btn.closest('.video-thumb').querySelector('.video-player');
  if (!video) return;
  if (video.requestFullscreen)            video.requestFullscreen();
  else if (video.webkitEnterFullscreen)   video.webkitEnterFullscreen();
  else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  else if (video.mozRequestFullScreen)    video.mozRequestFullScreen();
  else if (video.msRequestFullscreen)     video.msRequestFullscreen();
}

// ── SCROLL SUAVE ──
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start = null;

  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2;
    window.scrollTo(0, startY + diff * ease);
    if (p < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(target.getBoundingClientRect().top + window.scrollY - 68, 900);
    document.querySelector(".nav-toggle").classList.remove("open");
    document.querySelector(".nav-links").classList.remove("open");
  });
});

renderCatalogo();
