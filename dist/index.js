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
    const attr = function(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    };
    const runSplit = function(text, types = "lines, words") {
      if (!text) return;
      typeSplit = new SplitType(text, {
        types
      });
      return typeSplit;
    };
    const projectsMap = function() {
      const WRAP = ".map_wrap";
      const STATE_PATH = "data-state-path";
      const STATE_POINT = "data-state-point";
      const ACTIVE_CLASS = ".is-active";
      const wrap = document.querySelector(WRAP);
      const statePaths = gsap.utils.toArray(`[${STATE_PATH}]`);
      const statePoints = gsap.utils.toArray(STATE_POINT);
      if (!wrap) return;
      statePaths.forEach((state, index) => {
        const id = state.getAttribute(STATE_PATH);
        console.log(id);
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
    projectsMap();
    testimonialsSlider();
  });
})();
