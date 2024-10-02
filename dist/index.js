(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    if (gsap.ScrollTrigger !== void 0) {
      gsap.registerPlugin(ScrollTrigger);
    }
    const homeScrollPanel = function() {
      const COMPONENT = "[home-scroll-panel]";
      const components = gsap.utils.toArray(COMPONENT);
      if (!components.length === 0) return;
      components.forEach(function(component) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: component,
            start: "top bottom",
            end: "top 50%",
            markers: false,
            scrub: true
          },
          defaults: {
            duration: 1,
            ease: "none"
          }
        });
        tl.fromTo(
          component,
          {
            scale: 0.8,
            y: "4rem"
          },
          {
            scale: 1,
            y: "0rem"
          }
        );
      });
    };
    const homeUsesSlider = function() {
      const COMPONENT = ".home-uses_component";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const SCROLLBAR = ".swiper-scrollbar";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT).forEach(function(component) {
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
              spaceBetween: 16
            },
            // tablet
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            // desktop
            992: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          },
          speed: 600,
          loop: false,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS,
          navigation: {
            nextEl: nextButtonEl,
            prevEl: previousButtonEl,
            disabledClass: DISABLED_CLASS
          },
          scrollbar: {
            el: scrollbar,
            draggable: true
          },
          on: {
            slideChange: function() {
            }
          }
        });
      });
    };
    const testimonialsSlider = function() {
      const COMPONENT = ".testimonials_component";
      const SLIDER = ".swiper";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT);
      components.forEach(function(component) {
        if (!component) return;
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        const slider = component.querySelector(SLIDER);
        if (!slider) return;
        const swiper = new Swiper(slider, {
          speed: 800,
          slidesPerView: "auto",
          loop: true,
          centeredSlides: true,
          allowTouchMove: false,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS,
          navigation: {
            nextEl: nextButtonEl,
            prevEl: previousButtonEl,
            disabledClass: DISABLED_CLASS
          },
          on: {
            slideChange: function() {
            }
          }
        });
      });
    };
    homeUsesSlider();
    testimonialsSlider();
    homeScrollPanel();
  });
})();
