class DualAxisSlider {
  constructor(carouselElement) {
    if (!carouselElement) return;

    this.carousel = carouselElement;
    this.hTrack = this.carousel.querySelector('.dual-axis-carousel__h-track');
    this.hSlides = Array.from(this.carousel.querySelectorAll('.dual-axis-carousel__h-slide'));
    
    this.btnPrevH = document.getElementById('hero-prev-h');
    this.btnNextH = document.getElementById('hero-next-h');
    this.btnPrevV = document.getElementById('hero-prev-v');
    this.btnNextV = document.getElementById('hero-next-v');
    this.btnPlayPause = document.getElementById('hero-play-pause');
    this.matrixStatus = document.getElementById('hero-matrix-status');

    this.currentH = 0;
    this.currentV = 0;
    this.maxH = this.hSlides.length - 1;
    
    this.isPlaying = true;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 6000;

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchThreshold = 40;

    this.init();
  }

  init() {
    this.updateMatrixView();
    this.bindEvents();
    this.startAutoPlay();
  }

  updateMatrixView() {
    this.hTrack.style.transform = `translateX(-${this.currentH * 100}%)`;
    const activeHSlide = this.hSlides[this.currentH];
    const vTrack = activeHSlide.querySelector('.dual-axis-carousel__v-track');
    const vSlides = activeHSlide.querySelectorAll('.dual-axis-carousel__v-slide');
    const maxV = vSlides.length - 1;

    if (this.currentV > maxV) this.currentV = 0;
    vTrack.style.transform = `translateY(-${this.currentV * 100}%)`;

    const cityName = activeHSlide.dataset.cityName || `City ${this.currentH + 1}`;
    if (this.matrixStatus) {
      this.matrixStatus.textContent = `${cityName} • Highlight ${this.currentV + 1} of ${vSlides.length}`;
    }

    if (this.btnPrevV) this.btnPrevV.disabled = (this.currentV === 0);
    if (this.btnNextV) this.btnNextV.disabled = (this.currentV === maxV);
  }

  nextH() {
    this.currentH = (this.currentH + 1) % (this.maxH + 1);
    this.currentV = 0;
    this.updateMatrixView();
  }

  prevH() {
    this.currentH = (this.currentH - 1 + (this.maxH + 1)) % (this.maxH + 1);
    this.currentV = 0;
    this.updateMatrixView();
  }

  nextV() {
    const activeHSlide = this.hSlides[this.currentH];
    const totalV = activeHSlide.querySelectorAll('.dual-axis-carousel__v-slide').length;
    if (this.currentV < totalV - 1) {
      this.currentV++;
      this.updateMatrixView();
    }
  }

  prevV() {
    if (this.currentV > 0) {
      this.currentV--;
      this.updateMatrixView();
    }
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) this.startAutoPlay();
    else this.stopAutoPlay();
  }

  startAutoPlay() {
    if (!this.isPlaying) return;
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextH(), this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  bindEvents() {
    if (this.btnNextH) this.btnNextH.addEventListener('click', () => this.nextH());
    if (this.btnPrevH) this.btnPrevH.addEventListener('click', () => this.prevH());
    if (this.btnNextV) this.btnNextV.addEventListener('click', () => this.nextV());
    if (this.btnPrevV) this.btnPrevV.addEventListener('click', () => this.prevV());
    if (this.btnPlayPause) this.btnPlayPause.addEventListener('click', () => this.togglePlayPause());

    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => { if (this.isPlaying) this.startAutoPlay(); });
    this.carousel.addEventListener('focusin', () => this.stopAutoPlay());
    this.carousel.addEventListener('focusout', () => { if (this.isPlaying) this.startAutoPlay(); });

    this.carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.nextH();
      if (e.key === 'ArrowLeft') this.prevH();
      if (e.key === 'ArrowDown') this.nextV();
      if (e.key === 'ArrowUp') this.prevV();
    });

    this.carousel.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.carousel.addEventListener('touchend', (e) => {
      if (!this.touchStartX || !this.touchStartY) return;
      const diffX = this.touchStartX - e.changedTouches[0].clientX;
      const diffY = this.touchStartY - e.changedTouches[0].clientY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > this.touchThreshold) {
          if (diffX > 0) this.nextH();
          else this.prevH();
        }
      } else {
        if (Math.abs(diffY) > this.touchThreshold) {
          if (diffY > 0) this.nextV();
          else this.prevV();
        }
      }
      this.touchStartX = 0;
      this.touchStartY = 0;
    }, { passive: true });
  }
}

window.DualAxisSlider = DualAxisSlider;
