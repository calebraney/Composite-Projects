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
    const projectsMap = function(isMobile) {
      const WRAP = ".map_wrap";
      const STATE_PATH = "data-state-path";
      const STATE_POINT = "data-state-point";
      const ACTIVE_CLASS = "is-active";
      const wrap = document.querySelector(WRAP);
      const statePaths = gsap.utils.toArray(`[${STATE_PATH}]`);
      const statePoints = gsap.utils.toArray(`[${STATE_POINT}]`);
      if (!wrap) return;
      statePaths.forEach((statePath, index) => {
        const id = statePath.getAttribute(STATE_PATH);
        const statePoint = document.querySelector(`[${STATE_POINT}=${id}]`);
        if (!statePoint) return;
        const calculatePosition = function() {
          console.log("calc");
          const wrapRect = wrap.getBoundingClientRect();
          const wrapWidth = wrapRect.right - wrapRect.left;
          const stateRect = statePath.getBoundingClientRect();
          const statePointWidth = statePoint.getBoundingClientRect().right - statePoint.getBoundingClientRect().left;
          let left = Math.round(stateRect.right - wrapRect.left);
          let right = Math.round(left - (stateRect.right - stateRect.left) - statePointWidth);
          if (wrapWidth * 0.6 > left) {
            statePoint.style.left = left + "px";
          } else {
            statePoint.style.left = right + "px";
          }
          let top = Math.round(stateRect.top - wrapRect.top);
          statePoint.style.top = top + -30 + "px";
        };
        if (!isMobile) {
          calculatePosition();
        }
        let windowWidth = window.innerWidth;
        window.addEventListener("resize", function() {
          if (window.innerWidth !== windowWidth) {
            windowWidth = window.innerWidth;
            calculatePosition();
          }
        });
        statePath.addEventListener("mouseenter", function(e) {
          statePoints.forEach((point, index2) => {
            point.classList.remove(ACTIVE_CLASS);
          });
          statePaths.forEach((path, index2) => {
            path.classList.remove(ACTIVE_CLASS);
          });
          statePoint.classList.add(ACTIVE_CLASS);
          statePath.classList.add(ACTIVE_CLASS);
        });
      });
      wrap.addEventListener("mouseleave", function(e) {
        statePoints.forEach((point, index) => {
          point.classList.remove(ACTIVE_CLASS);
        });
        statePaths.forEach((path, index) => {
          path.classList.remove(ACTIVE_CLASS);
        });
      });
    };
    const featuredProjectsSlider = function() {
      const COMPONENT = ".projects_component.swiper";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT);
      components.forEach(function(component) {
        if (!component) return;
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        const slider = component;
        if (!slider) return;
        const swiper = new Swiper(slider, {
          speed: 800,
          slidesPerView: "auto",
          spaceBetween: 48,
          loop: false,
          centeredSlides: false,
          allowTouchMove: true,
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
    const careeersSlider = function() {
      const COMPONENT = ".employee-testimonials_slider";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT);
      components.forEach(function(component) {
        if (!component) return;
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        const slider = component;
        if (!slider) return;
        const swiper = new Swiper(slider, {
          speed: 800,
          slidesPerView: "auto",
          spaceBetween: 32,
          loop: false,
          centeredSlides: false,
          allowTouchMove: true,
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
    const landownersSlider = function() {
      const COMPONENT = ".landowner-testimonials_component";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const BULLET_WRAP = ".swiper-bullet-wrapper";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = [...document.querySelectorAll(COMPONENT)];
      components.forEach(function(component) {
        if (!component) return;
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        const bulletsEl = component.querySelector(BULLET_WRAP);
        const slider = component.querySelector(".swiper");
        if (!slider) return;
        const swiper = new Swiper(slider, {
          speed: 800,
          slidesPerView: 1,
          spaceBetween: 32,
          loop: false,
          centeredSlides: true,
          allowTouchMove: false,
          slideActiveClass: ACTIVE_CLASS,
          navigation: {
            nextEl: nextButtonEl,
            prevEl: previousButtonEl,
            disabledClass: DISABLED_CLASS
          },
          pagination: {
            type: "bullets",
            el: bulletsEl,
            bulletActiveClass: ACTIVE_CLASS,
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true
          }
        });
      });
    };
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px)  and (max-width: 991px)",
        isDesktop: "(min-width: 992px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      (gsapContext) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
        projectsMap(isMobile);
        careeersSlider();
        featuredProjectsSlider();
        landownersSlider();
      }
    );
  });
})();
