(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const tabsAutoplay = function() {
      const TAB_MENU = ".quote-tabs_tabs-menu";
      const TAB = ".quote-tabs_tab-link";
      const TIMER_LINE = ".quote-tabs_tab-line-fill";
      const ACTIVE_CLASS = "w--current";
      const TIMER_DURATION = 5;
      const components = [...document.querySelectorAll(TAB_MENU)];
      components.forEach((component) => {
        const tabs = [...component.querySelectorAll(TAB)];
        const timerLines = [...component.querySelectorAll(TIMER_LINE)];
        const timerDuration = TIMER_DURATION;
        if (tabs.length === 0) return;
        let timer;
        let userClick = true;
        let tl = gsap.timeline({});
        clearInterval(timer);
        const startTimer = function(tl2) {
          if (tl2) {
            tl2.kill();
            tl2 = gsap.timeline({});
          }
          let time = timerDuration - 1;
          tl2.fromTo(
            timerLines,
            {
              width: "0%"
            },
            {
              width: "100%",
              duration: time,
              ease: "none"
            }
          );
          timer = setInterval(function() {
            time--;
            if (time === 0) {
              changeTab();
            }
          }, 1e3);
        };
        const changeTab = function(nextIndex = void 0, manualClick = false) {
          if (manualClick === false) {
            userClick = false;
            if (nextIndex === void 0) {
              nextIndex = findNextIndex();
            }
            const nextTab = tabs[nextIndex];
            nextTab.click();
          }
          userClick = true;
          clearInterval(timer);
          startTimer(tl);
        };
        changeTab(0);
        const findNextIndex = function() {
          let currentIndex;
          tabs.forEach((tab, index) => {
            if (tab.classList.contains(ACTIVE_CLASS)) {
              currentIndex = index;
            }
          });
          if (currentIndex === tabs.length - 1) {
            return 0;
          } else {
            return currentIndex + 1;
          }
        };
        tabs.forEach((tab, index) => {
          tab.addEventListener("click", function() {
            if (userClick === true) {
              changeTab(index, true);
            }
          });
        });
      });
    };
    function dynamicSpans() {
      const HEADING = ".heading-dynamic";
      const SPAN = ".heading-dynamic-span";
      const SPAN_INNER = "heading-dynamic-span-inner";
      const headings = [...document.querySelectorAll(HEADING)];
      headings.forEach((item) => {
        spans = [...item.querySelectorAll(SPAN)];
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none none"
          }
        });
        spans.forEach((span) => {
          const lineMask = document.createElement("div");
          lineMask.classList.add(SPAN_INNER);
          span.appendChild(lineMask);
          tl.fromTo(
            lineMask,
            {
              opacity: 0
            },
            {
              opacity: 1,
              ease: "power1.out",
              duration: 0.1
            },
            "<.4"
          );
          tl.fromTo(
            lineMask,
            {
              width: "0%"
            },
            {
              width: "100%",
              ease: "power1.out",
              duration: 1
            },
            "<"
          );
        });
      });
    }
    function dynamicSpans() {
      const HEADING = ".heading-dynamic";
      const SPAN = ".heading-dynamic-span";
      const SPAN_INNER = "heading-dynamic-span-inner";
      const headings = [...document.querySelectorAll(HEADING)];
      headings.forEach((item) => {
        spans = [...item.querySelectorAll(SPAN)];
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            end: "bottom 70%",
            toggleActions: "play none none none"
          }
        });
        spans.forEach((span) => {
          const lineMask = document.createElement("div");
          lineMask.classList.add(SPAN_INNER);
          span.appendChild(lineMask);
          tl.fromTo(
            lineMask,
            {
              opacity: 0
            },
            {
              opacity: 1,
              ease: "power1.out",
              duration: 0.1
            },
            "<.4"
          );
          tl.fromTo(
            lineMask,
            {
              width: "0%"
            },
            {
              width: "100%",
              ease: "power1.out",
              duration: 1
            },
            "<"
          );
        });
      });
    }
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
          spaceBetween: 24,
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
    const solutionsSlider = function() {
      const COMPONENT = ".solutions-cards_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        loop: false
      };
      const modules = {
        navigation: true,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    const featuresSlider = function() {
      const COMPONENT = ".features-cards_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        loop: false,
        spaceBetween: 16
      };
      const modules = {
        navigation: true,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    const aboutLeadersSlider = function() {
      const COMPONENT = ".about-leaders_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        loop: false
      };
      const modules = {
        navigation: true,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    const careersSlider = function() {
      const COMPONENT = ".careers-employees_component";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        loop: false
      };
      const modules = {
        navigation: true,
        pagination: true,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    const featureTabsSlider = function() {
      const COMPONENT = ".industry-tabs_slider";
      const components = [...document.querySelectorAll(COMPONENT)];
      const options = {
        slidesPerView: "auto",
        loop: false
      };
      const modules = {
        navigation: true,
        pagination: false,
        autoplay: false
      };
      const sliders = createSlider(components, options, modules);
    };
    let mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      dynamicSpans();
      return () => {
      };
    });
    tabsAutoplay();
    solutionsSlider();
    featuresSlider();
    aboutLeadersSlider();
    careersSlider();
    featureTabsSlider();
  });
})();
