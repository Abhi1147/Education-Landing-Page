class SchoolMarquee {
  constructor() {
    this.marqueeContainers = document.querySelectorAll('.marquee');
    this.init();
  }

  init() {
    this.marqueeContainers.forEach((marquee) => {
      marquee.addEventListener('mouseenter', () => this.pauseMarquee(marquee));
      marquee.addEventListener('mouseleave', () => this.resumeMarquee(marquee));
      marquee.addEventListener('focusin', () => this.pauseMarquee(marquee));
      marquee.addEventListener('focusout', () => this.resumeMarquee(marquee));
    });
  }

  pauseMarquee(marqueeElement) {
    marqueeElement.querySelectorAll('.marquee__track').forEach(track => {
      track.style.animationPlayState = 'paused';
    });
  }

  resumeMarquee(marqueeElement) {
    marqueeElement.querySelectorAll('.marquee__track').forEach(track => {
      track.style.animationPlayState = 'running';
    });
  }
}

window.SchoolMarquee = SchoolMarquee;
