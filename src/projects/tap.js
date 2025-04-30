// v1.2 TAP Global interactions
document.addEventListener('DOMContentLoaded', function () {
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

  const marquee = function () {
    //animation ID
    const ANIMATION_ID = 'marquee';
    const WRAP = '[data-ix-marquee="wrap"]';
    const LIST = '[data-ix-marquee="list"]'; // put on the CMS LIST WRAP element (NOT THE LIST)
    const REVERSE = 'data-ix-marquee-reverse'; // needs to be set to true if reversed
    const DURATION = 'data-ix-marquee-duration'; //set a custom duration in seconds
    const DYNAMIC_DURATION = 'data-ix-marquee-duration-dynamic'; // set to true to make the duration dynamic per amount of items
    const DURATION_PER_ITEM = 'data-ix-marquee-duration-per-item'; // the duration per the amount of items
    const DUPLICATE_LIST = 'data-ix-marquee-duplicate-list';
    const HOVER_EFFECT = 'data-ix-marquee-hover'; //option for hover effect
    const ACCELERATE_ON_HOVER = 'accelerate';
    const DECELERATE_ON_HOVER = 'decelerate';
    const PAUSE_ON_HOVER = 'pause';
    //defaults
    const DEFAULT_DURATION = 30;
    const DEFAULT_DYNAMIC_DURATION = 5;
    //for each wrap
    const wraps = [...document.querySelectorAll(WRAP)];

    if (wraps.length === 0) return;
    wraps.forEach((wrap) => {
      //check to run on breakpoint
      // let runOnBreakpoint = checkBreakpoints(wrap, ANIMATION_ID, gsapContext);
      // if (runOnBreakpoint === false) return;

      let lists = [...wrap.querySelectorAll(LIST)];
      let reverse = attr(false, wrap.getAttribute(REVERSE));
      let duration = attr(DEFAULT_DURATION, wrap.getAttribute(DURATION));
      let durationDynamic = attr(false, wrap.getAttribute(DYNAMIC_DURATION));
      let duplicateList = attr(false, wrap.getAttribute(DUPLICATE_LIST));

      if (duplicateList) {
        let firstList = lists[0];
        console.log(lists[0]);
        let newList1 = firstList.cloneNode(true);
        let newList2 = firstList.cloneNode(true);

        wrap.appendChild(newList1);
        wrap.appendChild(newList2);

        lists = [...wrap.querySelectorAll(LIST)];
      }

      let durationPerItem = attr(DEFAULT_DYNAMIC_DURATION, wrap.getAttribute(DURATION_PER_ITEM));
      // get the amount of items in the wrap
      let itemCount = lists[0].childElementCount;
      if (itemCount === 1) {
        //if there is only one item get the list element inside it and count the amount of elements in that
        itemCount = lists[0].firstElementChild.childElementCount;
      }
      //if duration is set to be dynamic make the duration based on the amount of items and the duration per item
      if (durationDynamic) {
        duration = itemCount * durationPerItem;
      }

      let hoverEffect = attr('none', wrap.getAttribute(HOVER_EFFECT));

      let direction = 1;
      if (reverse) {
        direction = -1;
      }
      let tl = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: 'none',
        },
      });
      tl.fromTo(
        lists,
        {
          xPercent: 0,
        },
        {
          xPercent: -100 * direction,
          duration: duration,
        }
      );
      if (hoverEffect === ACCELERATE_ON_HOVER) {
        wrap.addEventListener('mouseenter', (event) => {
          tl.timeScale(2);
        });
        wrap.addEventListener('mouseleave', (event) => {
          tl.timeScale(1);
        });
      }
      if (hoverEffect === DECELERATE_ON_HOVER) {
        wrap.addEventListener('mouseenter', (event) => {
          tl.timeScale(0.5);
        });
        wrap.addEventListener('mouseleave', (event) => {
          tl.timeScale(1);
        });
      }
      if (hoverEffect === PAUSE_ON_HOVER) {
        wrap.addEventListener('mouseenter', (event) => {
          tl.pause();
        });
        wrap.addEventListener('mouseleave', (event) => {
          tl.play();
        });
      }
    });
  };

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
      if (!slider) return;
      //set the default settings
      const defaultSettings = {
        speed: 800,
        spaceBetween: 16,
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
  const lessonsSlider = function () {
    const COMPONENT = '.lessons-slider_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      spaceBetween: 0,
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

  const testimonialsSlider = function () {
    const COMPONENT = '.testimonials-slider_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      spaceBetween: 0,
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

  //   const homeTestimonialsSlider = function () {
  //     const COMPONENT = '.home-testimonials_slider-component';
  //     const components = [...document.querySelectorAll(COMPONENT)];
  //     const options = {
  //       slidesPerView: 'auto',
  //       spaceBetween: 16,
  //       loop: false,
  //     };
  //     //apply a module with defaults settings (canc override them using the options object above)
  //     const modules = {
  //       navigation: false,
  //       pagination: false,
  //       autoplay: true,
  //     };
  //     const sliders = createSlider(components, options, modules);
  //   };

  const bundlesSlider = function () {
    const COMPONENT = '.bundles_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: false,
      drag: true,
      allowSlideNext: true,
      //   autoHeight: true,
      //   freeMode: false,
    };
    //apply a module with defaults settings (canc override them using the options object above)
    const modules = {
      navigation: false,
      pagination: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
    sliders[0].slideNext();
    console.log(sliders[0]);
  };
  //////////////////////////////
  //Control Functions on page load
  const gsapInit = function () {
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: '(max-width: 767px)',
        isTablet: '(min-width: 768px)  and (max-width: 991px)',
        isDesktop: '(min-width: 992px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (gsapContext) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
        // let individual instances decide if they are run
        marquee();
        lessonsSlider();
        testimonialsSlider();
        homeTestimonialsSlider();

        //globaally run animations on specific breakpoints
        if (isMobile) {
          //   bundlesSlider();
        }
      }
    );
  };
  gsapInit();
});
