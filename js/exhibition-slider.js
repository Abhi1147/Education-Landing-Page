class ExhibitionSlider {
  constructor(sectionElement) {
    if (!sectionElement) return;

    this.section = sectionElement;
    this.track = this.section.querySelector('.exhibition-slider__track');
    this.cards = Array.from(this.track.querySelectorAll('.exhibition-card'));
    this.btnPrev = document.getElementById('exhibition-prev');
    this.btnNext = document.getElementById('exhibition-next');
    this.dotsContainer = document.getElementById('exhibition-dots');

    this.currentIndex = 0;
    this.visibleCards = this.getVisibleCardsCount();

    this.isPlaying = true;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.createPaginationDots();
    this.updateSlider();
    this.bindEvents();
    this.startAutoPlay();
  }

  getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  }

  getMaxIndex() {
    return Math.max(0, this.cards.length - this.visibleCards);
  }

  updateSlider() {
    this.visibleCards = this.getVisibleCardsCount();
    const maxIdx = this.getMaxIndex();
    if (this.currentIndex > maxIdx) this.currentIndex = maxIdx;

    const cardWidthPercentage = 100 / this.visibleCards;
    const gapOffset = 1.5 * (this.currentIndex);
    this.track.style.transform = `translateX(calc(-${this.currentIndex * cardWidthPercentage}% - ${gapOffset}rem))`;

    if (this.btnPrev) this.btnPrev.disabled = (this.currentIndex === 0);
    if (this.btnNext) this.btnNext.disabled = (this.currentIndex >= maxIdx);
  }

  createPaginationDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    const maxIdx = this.getMaxIndex();

    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('button');
      dot.className = 'pagination-dot';
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `Go to Exhibition Highlight ${i + 1}`);
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateSlider();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  next() {
    const maxIdx = this.getMaxIndex();
    this.currentIndex = (this.currentIndex < maxIdx) ? this.currentIndex + 1 : 0;
    this.updateSlider();
  }

  prev() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.getMaxIndex();
    this.updateSlider();
  }

  startAutoPlay() {
    if (!this.isPlaying) return;
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  bindEvents() {
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.next());
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prev());

    window.addEventListener('resize', () => {
      this.createPaginationDots();
      this.updateSlider();
    });

    this.section.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.section.addEventListener('mouseleave', () => this.startAutoPlay());
  }
}

window.ExhibitionSlider = ExhibitionSlider;
