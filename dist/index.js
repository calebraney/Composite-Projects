(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const attr = function(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    };
    const marquee = function() {
      const ANIMATION_ID = "marquee";
      const WRAP = '[data-ix-marquee="wrap"]';
      const LIST = '[data-ix-marquee="list"]';
      const REVERSE = "data-ix-marquee-reverse";
      const DURATION = "data-ix-marquee-duration";
      const DYNAMIC_DURATION = "data-ix-marquee-duration-dynamic";
      const DURATION_PER_ITEM = "data-ix-marquee-duration-per-item";
      const DUPLICATE_LIST = "data-ix-marquee-duplicate-list";
      const HOVER_EFFECT = "data-ix-marquee-hover";
      const ACCELERATE_ON_HOVER = "accelerate";
      const DECELERATE_ON_HOVER = "decelerate";
      const PAUSE_ON_HOVER = "pause";
      const DEFAULT_DURATION = 30;
      const DEFAULT_DYNAMIC_DURATION = 5;
      const wraps = document.querySelectorAll(WRAP);
      if (wraps.length === 0) return;
      wraps.forEach((wrap) => {
        const lists = [...wrap.querySelectorAll(LIST)];
        let reverse = attr(false, wrap.getAttribute(REVERSE));
        let duration = attr(DEFAULT_DURATION, wrap.getAttribute(DURATION));
        let durationDynamic = attr(false, wrap.getAttribute(DYNAMIC_DURATION));
        let duplicateList = attr(false, wrap.getAttribute(DUPLICATE_LIST));
        if (duplicateList) {
          let firstList = lists[0];
          let newList = firstList.cloneNode(true);
          wrap.appendChild(newList);
        }
        let durationPerItem = attr(DEFAULT_DYNAMIC_DURATION, wrap.getAttribute(DURATION_PER_ITEM));
        let itemCount = lists[0].childElementCount;
        if (itemCount === 1) {
          itemCount = lists[0].firstElementChild.childElementCount;
        }
        if (durationDynamic) {
          duration = itemCount * durationPerItem;
        }
        let hoverEffect = attr("none", wrap.getAttribute(HOVER_EFFECT));
        let direction = 1;
        if (reverse) {
          direction = -1;
        }
        let tl = gsap.timeline({
          repeat: -1,
          defaults: {
            ease: "none"
          }
        });
        tl.fromTo(
          lists,
          {
            xPercent: 0
          },
          {
            xPercent: -100 * direction,
            duration
          }
        );
        if (hoverEffect === ACCELERATE_ON_HOVER) {
          wrap.addEventListener("mouseenter", (event) => {
            tl.timeScale(2);
          });
          wrap.addEventListener("mouseleave", (event) => {
            tl.timeScale(1);
          });
        }
        if (hoverEffect === DECELERATE_ON_HOVER) {
          wrap.addEventListener("mouseenter", (event) => {
            tl.timeScale(0.5);
          });
          wrap.addEventListener("mouseleave", (event) => {
            tl.timeScale(1);
          });
        }
        if (hoverEffect === PAUSE_ON_HOVER) {
          wrap.addEventListener("mouseenter", (event) => {
            tl.pause();
          });
          wrap.addEventListener("mouseleave", (event) => {
            tl.play();
          });
        }
      });
    };
    const createSlider = function(components, options, modules) {
      const SLIDER = ".swiper";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const BULLET_WRAP = ".swiper-bullet-wrapper";
      const SCROLLBAR = ".swiper-scrollbar";
      const SCROLLBAR_DRAG = ".swiper-scrollbar-drag";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const swipersArray = [];
      components.forEach(function(component) {
        if (!component) return;
        const slider = component.querySelector(SLIDER);
        if (!slider) return;
        const defaultSettings = {
          speed: 800,
          spaceBetween: 16,
          loop: false,
          centeredSlides: false,
          allowTouchMove: true,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS
        };
        let finalModules = {};
        if (modules.navigation === true) {
          const nextButtonEl = component.querySelector(NEXT_BUTTON);
          const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
          const navigationSettings = {
            navigation: {
              nextEl: nextButtonEl,
              prevEl: previousButtonEl,
              disabledClass: DISABLED_CLASS
            }
          };
          finalModules = { ...finalModules, ...navigationSettings };
        }
        if (modules.pagination === true) {
          const bulletsEl = component.querySelector(BULLET_WRAP);
          const paginationSettings = {
            pagination: {
              type: "bullets",
              el: bulletsEl,
              bulletActiveClass: ACTIVE_CLASS,
              bulletClass: "swiper-bullet",
              bulletElement: "button",
              clickable: true
            }
          };
          finalModules = { ...finalModules, ...paginationSettings };
        }
        if (modules.scrollbar === true) {
          const scrollbarEl = component.querySelector(SCROLLBAR);
          const scrollbarSettings = {
            scrollbar: {
              el: scrollbarEl,
              dragClass: SCROLLBAR_DRAG,
              draggable: true,
              dragSize: "auto",
              //or set in number of pixels
              snapOnRelease: false
            }
          };
          finalModules = { ...finalModules, ...scrollbarSettings };
        }
        if (modules.autoplay === true) {
          const autoplaySettings = {
            autoplay: {
              delay: 3e3,
              disableOnInteraction: true,
              pauseOnMouseEnter: false,
              stopOnLastSlide: true
            }
          };
          finalModules = { ...finalModules, ...autoplaySettings };
        }
        const swiperSettings = { ...defaultSettings, ...finalModules, ...options };
        const swiper = new Swiper(slider, swiperSettings);
        swipersArray.push(swiper);
      });
      return swipersArray;
    };
    const lessonsSlider = function() {
      const COMPONENT = ".lessons-slider_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: false
      };
      const modules = {
        navigation: true,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    const testimonialsSlider = function() {
      const COMPONENT = ".testimonials-slider_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: false
      };
      const modules = {
        navigation: true,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    const homeTestimonialsSlider = function() {
      const COMPONENT = ".home-testimonials_slider-component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: false
      };
      const modules = {
        navigation: false,
        pagination: false,
        autoplay: true
      };
      const sliders = createSlider(components, options, modules);
    };
    const bundlesSlider = function() {
      const COMPONENT = ".bundles_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: false,
        drag: true,
        allowSlideNext: true
        //   autoHeight: true,
        //   freeMode: false,
      };
      const modules = {
        navigation: false,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
      sliders[0].slideNext();
      console.log(sliders[0]);
    };
    const gsapInit = function() {
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
          marquee();
          lessonsSlider();
          testimonialsSlider();
          homeTestimonialsSlider();
          if (isMobile) {
          }
        }
      );
    };
    gsapInit();
  });
})();
