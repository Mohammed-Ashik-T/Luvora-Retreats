// Add gentle floating heart/petal animation
const container = document.querySelector('.floating-elements');

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 4 + Math.random() * 4 + 's';
  container.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 500);

function goToPlans() {
  window.location.href = "plans.html";
}

