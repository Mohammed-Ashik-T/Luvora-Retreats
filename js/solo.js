const tripDetails = {
  adventure: {
    title: "Adventure Solo",
    body: `Explore the Himalayas, conquer mountain passes, and find freedom in thin air.`,
    bg: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  wellness: {
    title: "Wellness & Meditation",
    body: `Sunrise yoga, sea breeze, and quiet mind. Let the waves reset you.`,
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  backpack: {
    title: "Backpacking Solo",
    body: `Live simply. Hostels, friends, and endless paths through India’s heart.`,
    bg: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  nomad: {
    title: "Digital Nomad",
    body: `Work from anywhere. From Goa’s cafes to Bali’s beaches, stay inspired.`,
    bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  }
};

const modal = document.getElementById('screen-modal');
const modalBg = document.getElementById('modal-bg');
const modalRays = document.querySelector('.modal-rays');
const modalParticles = document.querySelector('.modal-particles');
const panel = document.querySelector('.modal-panel');
const titleEl = document.getElementById('modal-title');
const bodyEl = document.getElementById('modal-body');
const backBtn = document.getElementById('modal-back');

const openButtons = document.querySelectorAll('.view-btn');
openButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.trip-card');
    if (!card) return;
    const key = card.dataset.trip;
    const info = tripDetails[key];
    if (!info) return;

    // Apply modal content
    titleEl.textContent = info.title;
    bodyEl.textContent = info.body;
    modalBg.style.backgroundImage = `url('${info.bg}')`;

    // Ambient body glow color change
    document.body.style.setProperty('--accent',
      key === "wellness" ? "#66e3ff" :
      key === "adventure" ? "#74ff8f" :
      key === "nomad" ? "#ffd76b" : "#ff7edb");

    // Show modal
    modal.classList.add('active');
    modalBg.style.opacity = 0;
    setTimeout(() => {
      modalBg.style.transition = "opacity .9s ease, transform .9s ease";
      modalBg.style.opacity = 1;
      modalBg.style.transform = "scale(1)";
    }, 50);

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });
});

function closeModal(){
  modal.classList.remove('active');
  modalBg.style.opacity = 0;
  modalBg.style.transform = "scale(1.02)";
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}
document.getElementById('modal-back').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
