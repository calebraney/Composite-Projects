// Blockaid Homepage interaction
// v1.0
document.addEventListener('DOMContentLoaded', function () {
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }

  //////////////////////////////
  //home scrolling interaction
  const homeScrollPanel = function () {
    //selectors
    const COMPONENT = '[home-scroll-panel]';
    const components = gsap.utils.toArray(COMPONENT);
    if (!components.length === 0) return;

    components.forEach(function (component) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top bottom',
          end: 'top 50%',
          markers: false,
          scrub: true,
        },
        defaults: {
          duration: 1,
          ease: 'none',
        },
      });
      tl.fromTo(
        component,
        {
          scale: 0.8,
          y: '4rem',
        },
        {
          scale: 1,
          y: '0rem',
        }
      );
    });
  };

  //////////////////////////////
  //sliders
  const homeUsesSlider = function () {
    //Swiper selectors
    const COMPONENT = '.home-uses_component';
    //Button selectors
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    const SCROLLBAR = '.swiper-scrollbar';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';

    const components = gsap.utils.toArray(COMPONENT).forEach(function (component) {
      if (!component) return;
      const nextButtonEl = component.querySelector(NEXT_BUTTON);
      const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
      const scrollbar = component.querySelector(SCROLLBAR);
      if (!component) return;

      const swiper = new Swiper(component, {
        // modules: [Navigation],
        breakpoints: {
          // mobile
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          // tablet
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // desktop
          992: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
        speed: 600,
        loop: false,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: DISABLED_CLASS,
        },
        scrollbar: {
          el: scrollbar,
          draggable: true,
        },
        on: {
          slideChange: function () {
            // console.log('title swiper:', this.activeIndex);
          },
        },
      });
    });
  };

  const testimonialsSlider = function () {
    //Swiper selectors
    const COMPONENT = '.testimonials_component';
    const SLIDER = '.swiper';

    //Button selectors
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';

    const components = gsap.utils.toArray(COMPONENT);
    components.forEach(function (component) {
      if (!component) return;
      const nextButtonEl = component.querySelector(NEXT_BUTTON);
      const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
      const slider = component.querySelector(SLIDER);
      if (!slider) return;
      const swiper = new Swiper(slider, {
        speed: 800,
        slidesPerView: 'auto',
        loop: true,
        centeredSlides: true,
        allowTouchMove: false,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: DISABLED_CLASS,
        },
        on: {
          slideChange: function () {
            // console.log('title swiper:', this.activeIndex);
          },
        },
      });
    });
  };

  //Control Functions on page load
  homeUsesSlider();
  testimonialsSlider();
  homeScrollPanel();
  // homeFeaturesScroll()
});
