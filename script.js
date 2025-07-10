// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Slider logic
const slides = document.querySelector('.slides');
const links = slides.querySelectorAll('a');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + links.length) % links.length;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % links.length;
  updateSlider();
});

// Optional: Auto-slide every 5 seconds
let autoSlide = setInterval(() => {
  currentIndex = (currentIndex + 1) % links.length;
  updateSlider();
}, 5000);

// Pause auto-slide on hover
document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.slider').addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % links.length;
    updateSlider();
  }, 5000);
});

// Modal (lightbox) logic
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.querySelector('.modal-close');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.add('show');
    modal.style.display = 'flex';
    modalImg.classList.remove('loaded'); // reset fade
    modalImg.src = link.href;
    modalCaption.textContent = link.querySelector('img').alt || '';
    document.body.style.overflow = 'hidden';
  });
});

// Fade-in effect after image loads
modalImg.onload = () => {
  modalImg.classList.add('loaded');
};

// Close modal (X button)
modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.style.display = 'none';
  document.body.style.overflow = '';
});

// Click outside to close modal
modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Keyboard controls: ESC to close modal, arrows to navigate slider
document.addEventListener('keydown', e => {
  if (modal.style.display === 'flex') {
    if (e.key === 'Escape') {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  } else {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  }
});
