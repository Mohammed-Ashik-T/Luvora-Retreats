// Soft floating heart animation (simple randomized hearts)
const heartsContainer = document.querySelector('.hearts');
for (let i = 0; i < 20; i++) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDelay = Math.random() * 5 + 's';
  heart.style.background = ['#ff99cc', '#ff3366', '#ffd1dc'][Math.floor(Math.random()*3)];
  heartsContainer.appendChild(heart);
}

const style = document.createElement('style');
style.textContent = `
.floating-heart {
  position: fixed;
  width: 12px;
  height: 12px;
  background: pink;
  border-radius: 50%;
  opacity: 0.7;
  animation: rise 10s linear infinite;
  filter: blur(0.5px);
}
@keyframes rise {
  from { transform: translateY(100vh) scale(1); opacity: 0.8; }
  to { transform: translateY(-10vh) scale(1.3); opacity: 0; }
}`;
document.head.appendChild(style);
