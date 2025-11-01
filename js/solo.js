// Floating white hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.setProperty('--x', Math.random());
  heart.style.animationDuration = `${5 + Math.random() * 3}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 400);
