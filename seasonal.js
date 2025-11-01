// Place this file at js/seasonal.js and included by seasonal.html
// particles + scroll active season detection

(function () {
  const particlesRoot = document.getElementById('particles');
  const scrollContainer = document.getElementById('cylinder');
  const cards = Array.from(document.querySelectorAll('.season-card'));
  const seasonIcons = {
    summer: ['☀️','🌞','🏖️'],
    monsoon: ['💧','🌧️','☔'],
    autumn: ['🍂','🍁','🌰'],
    winter: ['❄️','⛄','🌨️']
  };

  /* ---------- helper: create particle spans ---------- */
  function createParticle(icon, left, top, size, dur) {
    const s = document.createElement('span');
    s.className = 'particle';
    s.textContent = icon;
    s.style.position = 'absolute';
    s.style.left = left + 'px';
    s.style.top = top + 'px';
    s.style.fontSize = size + 'px';
    s.style.opacity = Math.random() * 0.8 + 0.3;
    s.style.pointerEvents = 'none';
    s.style.animation = `fall ${dur}s linear infinite`;
    return s;
  }

  /* ---------- build initial particle pool (will be updated per season) ---------- */
  function clearParticles(){
    particlesRoot.innerHTML = '';
  }

  function spawnParticlesFor(season){
    clearParticles();
    const icons = seasonIcons[season] || seasonIcons.summer;
    const count = 28;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for(let i=0;i<count;i++){
      const icon = icons[Math.floor(Math.random()*icons.length)];
      const left = Math.random()*w;
      const top = -Math.random()*200; // start above visible
      const size = 12 + Math.random()*28;
      const dur = 6 + Math.random()*8;
      const p = createParticle(icon,left,top,size,dur);
      particlesRoot.appendChild(p);
    }
  }

  /* ---------- listen to which card is centered (active) ---------- */
  function activeCardIndex(){
    const viewCenter = window.innerHeight * 0.5;
    let closest = {idx:0,dist:Infinity};
    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height/2;
      const dist = Math.abs(cardCenter - viewCenter);
      if(dist < closest.dist){ closest = {idx, dist}; }
    });
    return closest.idx;
  }

  // initial spawn
  spawnParticlesFor('summer');

  // on scroll: add show class to cards in view and update season if center card changes
  let currentSeason = null;
  function onScroll() {
    // reveal cards (fade-in) when they enter
    cards.forEach(card=>{
      const rect = card.getBoundingClientRect();
      const trigger = window.innerHeight * 0.75;
      if(rect.top < trigger && rect.bottom > 60){
        card.classList.add('show');
      } else {
        card.classList.remove('show');
      }
    });

    // determine center card and spawn particles for its season
    const idx = activeCardIndex();
    const season = cards[idx].dataset.season;
    if(season && season !== currentSeason){
      currentSeason = season;
      spawnParticlesFor(season);
      // nice background tint change per season
      switch(season){
        case 'summer':
          document.body.style.background = 'linear-gradient(180deg,#fff8ef,#ffe9d6 60%, #fff6ee)';
          break;
        case 'monsoon':
          document.body.style.background = 'linear-gradient(180deg,#e6f7ff,#cfeeff 60%, #bfe8ff)';
          break;
        case 'autumn':
          document.body.style.background = 'linear-gradient(180deg,#fff6ee,#ffefdf 60%, #ffecd6)';
          break;
        case 'winter':
          document.body.style.background = 'linear-gradient(180deg,#f0f7ff,#e6f1ff 60%, #eaf6ff)';
          break;
        default:
          document.body.style.background = '';
      }
    }
  }

  // run once and on scroll/resize
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', ()=>spawnParticlesFor(currentSeason || 'summer'));
  // initial call (small timeout to ensure layout ready)
  setTimeout(onScroll, 200);

  /* ---------- simple CSS animation for particles (dynamically create stylesheet) ---------- */
  (function addParticleKeyframe(){
    const css = `
      @keyframes fall {
        0% { transform: translateY(-20vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
      #particles .particle { position: absolute; z-index: 6; will-change: transform, opacity; }
    `;
    const s = document.createElement('style');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  })();

})();
