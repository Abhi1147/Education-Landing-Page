document.addEventListener('DOMContentLoaded', () => {
  const heroCarousel = document.getElementById('hero-dual-axis-carousel');
  if (heroCarousel && window.DualAxisSlider) {
    new window.DualAxisSlider(heroCarousel);
  }

  if (window.SchoolMarquee) {
    new window.SchoolMarquee();
  }

  const schoolSection = document.getElementById('choose-schools-section');
  if (schoolSection && window.SchoolSlider) {
    new window.SchoolSlider(schoolSection);
  }

  const exhibitionSection = document.getElementById('exhibition-highlights-section');
  if (exhibitionSection && window.ExhibitionSlider) {
    new window.ExhibitionSlider(exhibitionSection);
  }

  const regForm = document.getElementById('pse-register-form');
  const formFeedback = document.getElementById('form-feedback');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('parent-name')?.value;
      const phone = document.getElementById('phone-number')?.value;
      const city = document.getElementById('city-select')?.value;

      if (!name || !phone || !city) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback form-feedback--error';
          formFeedback.style.backgroundColor = '#FEE2E2';
          formFeedback.style.color = '#991B1B';
          formFeedback.textContent = 'Please complete all required fields before submitting.';
        }
        return;
      }

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback form-feedback--success';
        formFeedback.style.backgroundColor = '#D1FAE5';
        formFeedback.style.color = '#065F46';
        formFeedback.textContent = `Thank you, ${name}! Your VIP Pass for the Premier Schools Exhibition has been sent to ${phone}.`;
      }

      regForm.reset();
    });
  }
});
