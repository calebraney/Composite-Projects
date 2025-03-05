// Gather AI Interactions
// v1.0
document.addEventListener('DOMContentLoaded', function () {
  const quoteTabsAutoplay = function () {
    //selectors
    const TAB_MENU = '.quote-tabs_tabs-menu';
    const TAB = '.quote-tabs_tab-link';
    const TIMER_LINE = '.quote-tabs_tab-line-fill';
    const ACTIVE_CLASS = 'w--current';
    //animation options
    const TIMER_DURATION = 5;

    const sliders = [...document.querySelectorAll(TAB_MENU)];
    sliders.forEach((slider) => {
      const slides = [...slider.querySelectorAll(TAB)];
      const timerLines = [...slider.querySelectorAll(TIMER_LINE)];
      //get slider duration from attribute or set it to the default
      const timerDuration = TIMER_DURATION;
      if (slides.length === 0) return;

      //set timer and gsap timeline variable
      let timer;
      let userClick = true; //track if the user clicked the slider
      let tl = gsap.timeline({});
      clearInterval(timer);

      //timer
      const startTimer = function (tl) {
        if (tl) {
          tl.kill();
        }
        tl = gsap.timeline({});
        // let currentTimerLine = document.querySelector(`.${ACTIVE_CLASS} ${TIMER_LINE}`);
        // console.log(currentTimerLine);
        let time = timerDuration - 1;
        // start gsap animation
        tl.fromTo(
          timerLines,
          {
            width: '0%',
          },
          {
            width: '100%',
            duration: time,
            ease: 'none',
          }
        );
        //create interval timer
        timer = setInterval(function () {
          //decrease the time by one second
          time--;
          //if timer is complete change slides
          if (time === 0) {
            changeTab();
          }
        }, 1000);
      };

      const changeTab = function (nextIndex = undefined, manualClick = false, resetTimer = true) {
        //if slide wasn't manually clicked
        if (manualClick === false) {
          //set user click to false
          userClick = false;
          if (nextIndex === undefined) {
            nextIndex = findNextIndex();
          }
          const nextSlide = slides[nextIndex];
          nextSlide.click();
        }
        //reset user click
        userClick = true;
        //clear the timer interval
        clearInterval(timer);
        //start the timer
        startTimer(tl);
      };
      changeTab(0);

      //utility function to find the next slide in the loop
      const findNextIndex = function () {
        let currentIndex;
        slides.forEach((slide, index) => {
          if (slide.classList.contains(ACTIVE_CLASS)) {
            currentIndex = index;
          }
        });
        //if current item is the last item set active index to the first item
        if (currentIndex === slides.length - 1) {
          return 0;
        } else {
          //otherwize set active index to the next item
          return currentIndex + 1;
        }
      };

      //event listener for if the user manually clicks a tab
      slides.forEach((slide, index) => {
        slide.addEventListener('click', function () {
          if (userClick === true) {
            changeTab(index, true);
          }
        });
      });

      //restart timer on resize
      let windowWidth = window.innerWidth;
      window.addEventListener('resize', function () {
        if (window.innerWidth !== windowWidth) {
          windowWidth = window.innerWidth;
          slides.forEach((slide, index) => {
            if (slide.classList.contains(ACTIVE_CLASS)) {
              changeTab(index);
            }
          });
        }
      });
    });
  };

  function dynamicSpans() {
    const HEADING = '.heading-dynamic';
    const SPAN = '.heading-dynamic-span';
    const SPAN_INNER = 'heading-dynamic-span-inner';
    const headings = [...document.querySelectorAll(HEADING)];
    headings.forEach((item) => {
      //get spans
      spans = [...item.querySelectorAll(SPAN)];
      //setup timeline
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 70%',
          end: 'bottom 70%',
          toggleActions: 'play none none none',
        },
      });

      spans.forEach((span) => {
        // create a new div element
        const lineMask = document.createElement('div');
        //give it a class
        lineMask.classList.add(SPAN_INNER);
        // add the new div to a parent
        span.appendChild(lineMask);
        tl.fromTo(
          lineMask,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: 'power1.out',
            duration: 0.1,
          },
          '<.4'
        );
        tl.fromTo(
          lineMask,
          {
            width: '0%',
          },
          {
            width: '100%',
            ease: 'power1.out',
            duration: 1,
          },
          '<'
        );
      });
    });
  }

  const createSlider = function (components, options, modules) {
    //Element selectors
    const SLIDER = '.swiper';
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    const BULLET_WRAP = '.swiper-bullet-wrapper';
    const SCROLLBAR = '.swiper-scrollbar';
    const SCROLLBAR_DRAG = '.swiper-scrollbar-drag';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';
    const swipersArray = [];
    //loop through each component and create a swiper
    components.forEach(function (component) {
      //get elements
      if (!component) return;
      const slider = component.querySelector(SLIDER);
      // console.log(slider);
      if (!slider) return;
      //set the default settings
      const defaultSettings = {
        speed: 800,
        spaceBetween: 24,
        loop: false,
        centeredSlides: false,
        allowTouchMove: true,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
      };
      // setup module settings
      let finalModules = {};
      //NAVIGATION
      if (modules.navigation === true) {
        //get the navigation elements
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        //set the navigation settings
        const navigationSettings = {
          navigation: {
            nextEl: nextButtonEl,
            prevEl: previousButtonEl,
            disabledClass: DISABLED_CLASS,
          },
        };
        finalModules = { ...finalModules, ...navigationSettings };
      }
      //PAGINATION
      if (modules.pagination === true) {
        //get the pagination elements
        const bulletsEl = component.querySelector(BULLET_WRAP);
        //set the pagination settings
        const paginationSettings = {
          pagination: {
            type: 'bullets',
            el: bulletsEl,
            bulletActiveClass: ACTIVE_CLASS,
            bulletClass: 'swiper-bullet',
            bulletElement: 'button',
            clickable: true,
          },
        };
        finalModules = { ...finalModules, ...paginationSettings };
      }
      //SCROLLBAR
      if (modules.scrollbar === true) {
        //get the pagination elements
        const scrollbarEl = component.querySelector(SCROLLBAR);
        //set the pagination settings
        const scrollbarSettings = {
          scrollbar: {
            el: scrollbarEl,
            dragClass: SCROLLBAR_DRAG,
            draggable: true,
            dragSize: 'auto', //or set in number of pixels
            snapOnRelease: false,
          },
        };
        finalModules = { ...finalModules, ...scrollbarSettings };
      }
      //AUTOPLAY
      if (modules.autoplay === true) {
        //set the autoplay settings
        const autoplaySettings = {
          autoplay: {
            delay: 3000,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
            stopOnLastSlide: true,
          },
        };
        finalModules = { ...finalModules, ...autoplaySettings };
      }

      //combine all the settings
      const swiperSettings = { ...defaultSettings, ...finalModules, ...options };
      //create swiper
      const swiper = new Swiper(slider, swiperSettings);
      //push swiper to array for access
      swipersArray.push(swiper);
    });
    return swipersArray;
  };

  //////////////////////////////
  //Slider instances
  const solutionsSlider = function () {
    const COMPONENT = '.solutions-cards_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: false,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: true,
      pagination: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };
  const featuresSlider = function () {
    const COMPONENT = '.features-cards_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: false,
      spaceBetween: 16,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: true,
      pagination: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };
  const featureTabsSlider = function () {
    const COMPONENT = '.industry-tabs_slider';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: false,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: true,
      pagination: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };
  const aboutLeadersSlider = function () {
    const COMPONENT = '.about-leaders_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: false,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: true,
      pagination: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };
  const careersSlider = function () {
    const COMPONENT = '.careers-employees_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: false,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: true,
      pagination: true,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };

  //Control Functions on page load
  // quoteTabsAutoplay2();
  quoteTabsAutoplay();

  solutionsSlider();
  featuresSlider();
  // featureTabsSlider();
  aboutLeadersSlider();
  careersSlider();

  let mm = gsap.matchMedia();
  mm.add('(min-width: 992px)', () => {
    // the code will only run if the media query matches
    dynamicSpans();
    return () => {
      //this code will run when the media query stops matching
    };
  });
});
