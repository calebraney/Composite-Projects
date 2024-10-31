// Galehead interactions
// v3.0
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

  const projectsMap = function (isMobile) {
    const WRAP = '.map_wrap';
    const STATE_PATH = 'data-state-path';
    const STATE_POINT = 'data-state-point';
    const ACTIVE_CLASS = 'is-active';

    const wrap = document.querySelector(WRAP);
    const statePaths = gsap.utils.toArray(`[${STATE_PATH}]`);
    const statePoints = gsap.utils.toArray(`[${STATE_POINT}]`);

    if (!wrap) return;

    statePaths.forEach((statePath, index) => {
      const id = statePath.getAttribute(STATE_PATH);
      const statePoint = document.querySelector(`[${STATE_POINT}=${id}]`);
      if (!statePoint) return;

      //get position of elements

      const calculatePosition = function () {
        console.log('calc');
        const wrapRect = wrap.getBoundingClientRect();
        const wrapWidth = wrapRect.right - wrapRect.left;
        const stateRect = statePath.getBoundingClientRect();
        const statePointWidth =
          statePoint.getBoundingClientRect().right - statePoint.getBoundingClientRect().left;
        //position items on the right of the state  if they are on the left left
        let left = Math.round(stateRect.right - wrapRect.left);
        let right = Math.round(left - (stateRect.right - stateRect.left) - statePointWidth);
        if (wrapWidth * 0.6 > left) {
          statePoint.style.left = left + 'px';
        } else {
          statePoint.style.left = right + 'px';
        }
        //position the top of the element
        let top = Math.round(stateRect.top - wrapRect.top);
        statePoint.style.top = top + -30 + 'px';
      };
      if (!isMobile) {
        calculatePosition();
      }

      let windowWidth = window.innerWidth;
      window.addEventListener('resize', function () {
        if (window.innerWidth !== windowWidth) {
          windowWidth = window.innerWidth;
          //input code you want run after the browser width is changed
          calculatePosition();
        }
      });

      //show and hide map point on hover
      statePath.addEventListener('mouseenter', function (e) {
        //remove active class from all items
        statePoints.forEach((point, index) => {
          point.classList.remove(ACTIVE_CLASS);
        });
        statePaths.forEach((path, index) => {
          path.classList.remove(ACTIVE_CLASS);
        });
        //activate current point
        statePoint.classList.add(ACTIVE_CLASS);
        statePath.classList.add(ACTIVE_CLASS);
      });
      // statePath.addEventListener('mouseleave', function (e) {
      //   //activate current point
      //   statePoint.classList.remove(ACTIVE_CLASS);
      // });
    });

    //if mouse leaves the map remove all points
    wrap.addEventListener('mouseleave', function (e) {
      //activate current point
      statePoints.forEach((point, index) => {
        point.classList.remove(ACTIVE_CLASS);
      });
      statePaths.forEach((path, index) => {
        path.classList.remove(ACTIVE_CLASS);
      });
    });
  };

  const createSlider = function (components, options, modules) {
    //Element selectors
    const SLIDER = '.swiper';
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    const BULLET_WRAP = '.swiper-bullet-wrapper';
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

      //combine all the settings
      const swiperSettings = { ...defaultSettings, ...finalModules, ...options };
      //create swiper
      const swiper = new Swiper(slider, swiperSettings);
      //push swiper to array for access
      swipersArray.push(swiper);
    });
    return swipersArray;
  };

  const caseGallerySlider = function () {
    const COMPONENT = '.case-gallery-slider_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      loop: true,
    };
    const modules = {
      navigation: true,
      pagination: false,
      autoplay: false,
    };
    const sliders = createSlider(components, options, modules);
  };

  const caseNewsSlider = function () {
    const COMPONENT = '.case-news-slider_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: false,
      centeredSlides: false,
    };
    const modules = {
      navigation: true,
    };
    const sliders = createSlider(components, options, modules);
  };

  const featuredProjectsSlider = function () {
    const COMPONENT = '.projects-slider_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      breakpoints: {
        // mobile
        320: {
          spaceBetween: 16,
        },
        // tablet
        768: {
          spaceBetween: 24,
        },
        // desktop
        992: {
          spaceBetween: 48,
        },
      },
    };
    const modules = {
      navigation: true,
    };
    const sliders = createSlider(components, options, modules);
  };

  const careeersSlider = function () {
    const COMPONENT = '.employee-testimonials_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 'auto',
      breakpoints: {
        // mobile
        320: {
          spaceBetween: 16,
        },
        // tablet
        768: {
          spaceBetween: 24,
        },
        // desktop
        992: {
          spaceBetween: 32,
        },
      },
    };
    const modules = {
      navigation: true,
      pagination: false,
    };
    const sliders = createSlider(components, options, modules);
  };

  const landownersSlider = function () {
    const COMPONENT = '.landowner-testimonials_component';
    const components = [...document.querySelectorAll(COMPONENT)];
    const options = {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: false,
      centeredSlides: true,
    };
    const modules = {
      navigation: true,
      pagination: true,
    };
    const sliders = createSlider(components, options, modules);
  };

  //run interactions on page load
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
      projectsMap(isMobile);
      careeersSlider();
      featuredProjectsSlider();
      landownersSlider();
      caseGallerySlider();
      caseNewsSlider();
      // newSlider();
      //globaally run animations on specific breakpoints
    }
  );
});
