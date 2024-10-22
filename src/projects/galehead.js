// Galehead interaction
// v1.0
document.addEventListener('DOMContentLoaded', function () {
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  //////////////////////////////
  // Utility functions
  const attr = function (defaultVal, attrVal) {
    //get the type of the default
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal;
    if (attrVal === 'true' && defaultValType === 'boolean') return true;
    if (attrVal === 'false' && defaultValType === 'boolean') return false;
    if (isNaN(attrVal) && defaultValType === 'string') return attrVal;
    if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal;
    return defaultVal;
  };

  const runSplit = function (text, types = 'lines, words') {
    if (!text) return;
    typeSplit = new SplitType(text, {
      types: types,
    });
    return typeSplit;
  };

  //////////////////////////////
  // INTERACTIONS

  const projectsMap = function () {
    const WRAP = '.map_wrap';
    const STATE_PATH = 'data-state-path';
    const STATE_POINT = 'data-state-point';
    const ACTIVE_CLASS = '.is-active';

    const wrap = document.querySelector(WRAP);
    const statePaths = gsap.utils.toArray(`[${STATE_PATH}]`);
    const statePoints = gsap.utils.toArray(STATE_POINT);
    if (!wrap) return;

    statePaths.forEach((state, index) => {
      const id = state.getAttribute(STATE_PATH);
      console.log(id);
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
  //run interactions on page load
  projectsMap();
  testimonialsSlider();
});
