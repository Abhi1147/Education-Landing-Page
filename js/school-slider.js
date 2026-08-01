class SchoolSlider {
  constructor(sectionElement) {
    if (!sectionElement) return;

    this.section = sectionElement;
    this.grid = this.section.querySelector('.choose-schools__grid');
    this.paginationContainer = this.section.querySelector('.choose-schools__pagination');
    this.cards = Array.from(this.grid.querySelectorAll('.card'));
    
    this.currentIndex = 0;
    this.isMobile = window.innerWidth < 768;

    this.init();
  }

  init() {
    this.checkResponsiveState();
    this.bindEvents();
  }

  checkResponsiveState() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.grid.classList.add('choose-schools__grid--mobile-slider');
      this.createPaginationDots();
    } else {
      this.grid.classList.remove('choose-schools__grid--mobile-slider');
      if (this.paginationContainer) this.paginationContainer.innerHTML = '';
    }
  }

  createPaginationDots() {
    if (!this.paginationContainer) return;
    this.paginationContainer.innerHTML = '';

    this.cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'pagination-dot';
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `Go to School category ${index + 1}`);
      dot.setAttribute('aria-selected', index === this.currentIndex ? 'true' : 'false');
      
      dot.addEventListener('click', () => this.scrollToCard(index));
      this.paginationContainer.appendChild(dot);
    });
  }

  scrollToCard(index) {
    this.currentIndex = index;
    if (this.cards[index]) {
      this.cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      this.updateActiveDot();
    }
  }

  updateActiveDot() {
    if (!this.paginationContainer) return;
    const dots = Array.from(this.paginationContainer.querySelectorAll('.pagination-dot'));
    dots.forEach((dot, index) => {
      const isActive = index === this.currentIndex;
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) dot.classList.add('is-active');
      else dot.classList.remove('is-active');
    });
  }

  bindEvents() {
    window.addEventListener('resize', () => this.checkResponsiveState());
    if (this.grid) {
      let scrollTimeout;
      this.grid.addEventListener('scroll', () => {
        if (!this.isMobile) return;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const newIndex = Math.round(this.grid.scrollLeft / this.cards[0].offsetWidth);
          if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.cards.length) {
            this.currentIndex = newIndex;
            this.updateActiveDot();
          }
        }, 100);
      });
    }
  }
}

window.SchoolSlider = SchoolSlider;
