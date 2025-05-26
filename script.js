// Hamburger menu responsive
const burger = document.querySelector('.burger');
const nav = document.querySelector('header nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Smooth scroll untuk navigasi
document.querySelectorAll('header nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('active');
    }
  });
});

// Reveal section saat scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 70) {
      el.classList.add('active');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Lightbox modal gallery
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const galleryThumbs = document.querySelectorAll('.gallery-thumb');

galleryThumbs.forEach(img => {
  img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    setTimeout(() => modalImg.classList.add('active'), 20);
  });
});
closeBtn.onclick = function() {
  modal.style.display = "none";
  modalImg.classList.remove('active');
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalImg.classList.remove('active');
  }
}
window.addEventListener('keydown', function(e) {
  if (modal.style.display === "block" && (e.key === "Escape" || e.key === "Esc")) {
    modal.style.display = "none";
    modalImg.classList.remove('active');
  }
});