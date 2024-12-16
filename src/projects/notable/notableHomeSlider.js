// Notable home slider
// v1.1
document.addEventListener('DOMContentLoaded', function () {
  const homeSlider = function () {
    //Swiper selectors
    const COMPONENT = '.notable_slider_component';
    const SLIDER = '.swiper';
    //Button selectors
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';
    const components = [...document.querySelectorAll(COMPONENT)];
    components.forEach(function (component) {
      if (!component) return;
      const slider = component.querySelector(SLIDER);
      // const nextButtonEl = component.querySelector(NEXT_BUTTON);
      // const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
      if (!slider || !component) return;

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 56,
        speed: 800,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        parallax: true,
        allowTouchMove: false,
        mousewheel: false,
        keyboard: false,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
        effect: 'creative',
        creativeEffect: {
          next: {
            // Array with translate X, Y and Z values
            translate: ['60%', 0, 0],
            opacity: 0,
          },
          prev: {
            // Array with translate X, Y and Z values
            translate: ['-60%', 0, 0],
            opacity: 0,
          },
        },
        // fadeEffect: {
        //   crossFade: true,
        // },

        // on: {
        //   slideChange: function () {
        //     // console.log('title swiper:', this.activeIndex);
        //   },
        // },
      });
    });
  };
  homeSlider();
});
