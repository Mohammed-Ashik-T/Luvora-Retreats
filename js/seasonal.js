const seasonBg = document.getElementById("season-bg");

// background effects (realistic seasonal loop)
const seasons = [
  {
    name: "summer",
    bg: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    effect: "sunny"
  },
  {
    name: "monsoon",
    bg: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
    effect: "rain"
  },
  {
    name: "winter",
    bg: "url('https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef')",
    effect: "snow"
  },
  {
    name: "spring",
    bg: "url('https://images.unsplash.com/photo-1552083375-1447ce886485')",
    effect: "leaves"
  }
];

let current = 0;

// change background every 10s
setInterval(() => {
  current = (current + 1) % seasons.length;
  changeSeason(seasons[current]);
}, 10000);

function changeSeason(season) {
  seasonBg.style.backgroundImage = season.bg;
  addEffect(season.effect);
}

// realistic seasonal effects
function addEffect(effect) {
  removeExistingEffects();

  if (effect === "rain") createRain();
  else if (effect === "snow") createSnow();
  else if (effect === "leaves") createLeaves();
  else if (effect === "sunny") createSunRays();
}

function removeExistingEffects() {
  document.querySelectorAll(".effect").forEach(el => el.remove());
}

function createRain() {
  for (let i = 0; i < 60; i++) {
    let drop = document.createElement("div");
    drop.className = "effect rain";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    document.body.appendChild(drop);
  }
}

function createSnow() {
  for (let i = 0; i < 40; i++) {
    let flake = document.createElement("div");
    flake.className = "effect snow";
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDuration = 3 + Math.random() * 3 + "s";
    flake.innerText = "❄️";
    document.body.appendChild(flake);
  }
}

function createLeaves() {
  for (let i = 0; i < 20; i++) {
    let leaf = document.createElement("div");
    leaf.className = "effect leaf";
    leaf.style.left = Math.random() * 100 + "vw";
    leaf.innerText = "🍃";
    leaf.style.animationDuration = 4 + Math.random() * 4 + "s";
    document.body.appendChild(leaf);
  }
}

function createSunRays() {
  let rays = document.createElement("div");
  rays.className = "effect sunny";
  document.body.appendChild(rays);
}

// Base animations for effects
const style = document.createElement('style');
style.innerHTML = `
.effect.rain {
  position: fixed;
  top: -10px;
  width: 2px;
  height: 20px;
  background: rgba(255,255,255,0.6);
  animation: rainFall linear infinite;
  z-index: 0;
}
@keyframes rainFall {
  to { transform: translateY(100vh); }
}

.effect.snow, .effect.leaf {
  position: fixed;
  top: -10px;
  font-size: 1.5rem;
  animation: fall linear infinite;
  z-index: 0;
}
@keyframes fall {
  to { transform: translateY(100vh) rotate(360deg); }
}

.effect.sunny {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,0,0.3), transparent 70%);
  animation: pulse 4s ease-in-out infinite alternate;
  z-index: 0;
}
@keyframes pulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.7; }
}
`;
document.head.appendChild(style);

// Initialize first season
changeSeason(seasons[current]);
