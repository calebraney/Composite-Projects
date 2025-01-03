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
        if (!slider || !component) return;
        const swiper = new Swiper(slider, {
          slidesPerView: 1,
          spaceBetween: 56,
          speed: 1e3,
          loop: true,
          autoplay: {
            delay: 3e3
          },
          parallax: true,
          allowTouchMove: false,
          mousewheel: false,
          keyboard: false,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS,
          effect: "creative",
          creativeEffect: {
            next: {
              // Array with translate X, Y and Z values
              translate: ["60%", 0, 0],
              opacity: 0
            },
            prev: {
              // Array with translate X, Y and Z values
              translate: ["-60%", 0, 0],
              opacity: 0
            }
          }
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
    const homeOrbPulse = function() {
      const ITEM = '[data-ix-platform-orb="item"]';
      const orbs = [...document.querySelectorAll(ITEM)];
      if (orbs.length === 0) return;
      let tl = gsap.timeline({
        repeat: -1,
        yoyo: true
      });
      tl.to(orbs, {
        scale: 0.8,
        ease: "power2.InOut",
        duration: 1.2,
        stagger: { each: 0.2, repeat: -1, yoyo: true }
      });
    };
    homeOrbPulse();
    let mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      homeScroll();
      return () => {
      };
    });
  });
  var Webflow = Webflow || [];
  Webflow.push(function() {
    window.addEventListener("resize", function() {
      window.Webflow.require("lottie").lottie.resize();
    });
  });
})();
