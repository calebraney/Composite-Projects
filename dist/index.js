(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const homeSlider = function() {
      const COMPONENT = ".notable_slider_component";
      const SLIDER = ".swiper";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = [...document.querySelectorAll(COMPONENT)];
      components.forEach(function(component) {
        if (!component) return;
        const slider = component.querySelector(SLIDER);
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        if (!slider || !component) return;
        const swiper = new Swiper(slider, {
          slidesPerView: 1,
          spaceBetween: 24,
          speed: 800,
          loop: true,
          effect: "fade",
          fadeEffect: {
            crossFade: true
          },
          autoplay: {
            delay: 3e3
          },
          parallax: true,
          allowTouchMove: false,
          mousewheel: false,
          keyboard: false,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS,
          // navigation: {
          //   nextEl: nextButtonEl,
          //   prevEl: previousButtonEl,
          //   disabledClass: DISABLED_CLASS,
          // },
          on: {
            slideChange: function() {
            }
          }
        });
        console.log(swiper);
      });
    };
    homeSlider();
  });
})();
