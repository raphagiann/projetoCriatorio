const bicudos = [
  { id: 1, nome: "Bicudo Rei",      sexo: "Macho",  pai: "Trovão do Cerrado", mae: "Estrela da Serra", foto: null, genealogia: null },
  { id: 2, nome: "Bicudo Ouro",     sexo: "Macho",  pai: "Ventania",          mae: "Flor do Mato",     foto: null, genealogia: null },
  { id: 3, nome: "Bicuda Pérola",   sexo: "Fêmea",  pai: "Trovão do Cerrado", mae: "Brisa da Manhã",   foto: null, genealogia: null },
  { id: 4, nome: "Bicudo Diamante", sexo: "Macho",  pai: "Relâmpago",         mae: "Estrela da Serra", foto: null, genealogia: null },
  { id: 5, nome: "Bicuda Safira",   sexo: "Fêmea",  pai: "Ventania",          mae: "Flor do Mato",     foto: null, genealogia: null },
  { id: 6, nome: "Bicudo Trovão",   sexo: "Macho",  pai: "Relâmpago",         mae: "Brisa da Manhã",   foto: null, genealogia: null }
];

function renderCatalogo() {
  document.getElementById("catalogoGrid").innerHTML = bicudos.map(b => `
    <div class="bird-card">
      <div class="bird-foto">
        ${b.foto
          ? `<img src="${b.foto}" alt="${b.nome}" />`
          : `<div class="bird-foto-placeholder">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" xmlns="http://www.w3.org/2000/svg">
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

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("open");
}

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
    document.querySelector(".nav-links").classList.remove("open");
  });
});

renderCatalogo();
