// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    document.getElementById('nav-menu').classList.remove('active');
  });
});

// Slider Functionality for Certificates and Projects
const sliders = {
  certificate: { index: 0, container: document.querySelector('.certificate-slider') },
  project: { index: 0, container: document.querySelector('.project-slider') }
};

document.querySelectorAll('.slider-btn').forEach(button => {
  button.addEventListener('click', () => {
    const sliderType = button.dataset.slider;
    const slider = sliders[sliderType];
    const cards = slider.container.children;
    const cardWidth = slider.container.offsetWidth;

    if (button.classList.contains('next')) {
      slider.index = (slider.index + 2) % cards.length;
    } else {
      slider.index = (slider.index - 2 + cards.length) % cards.length;
    }

    slider.container.style.transform = `translateX(-${(slider.index / 2) * cardWidth}px)`;
  });
});

// Certificate Full-Screen Modal
document.querySelectorAll('.certificate-img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.style.display = 'flex';
  });
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('certificate-modal').style.display = 'none';
});

document.getElementById('certificate-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('certificate-modal')) {
    document.getElementById('certificate-modal').style.display = 'none';
  }
});

// Popup functionality for contact links
const contactLinks = document.querySelectorAll('.contact-links a');
contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href').startsWith('mailto:')) {
      // Mailto link will handle itself
      return;
    }
    e.preventDefault();
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
      <div class="popup-content">
        <p>You will be redirected to ${link.textContent.trim()}</p>
        <button id="continue-redirect">Continue</button>
        <button id="cancel-redirect">Cancel</button>
      </div>
    `;
    document.body.appendChild(popup);
    
    document.getElementById('continue-redirect').addEventListener('click', () => {
      window.open(link.getAttribute('href'), '_blank');
      document.body.removeChild(popup);
    });
    
    document.getElementById('cancel-redirect').addEventListener('click', () => {
      document.body.remove