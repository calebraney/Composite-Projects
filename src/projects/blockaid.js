// Blockaid Homepage interaction
// v2.1
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

  const load = function () {
    // hero animation attribute
    const ATTRIBUTE = 'data-load';
    // hero animation selectors
    const HEADING = 'heading';
    const ITEM = 'item';
    const IMAGE = 'image';
    const STAGGER = 'stagger';
    //tween options
    const POSITION = 'data-load-position'; // sequential by default, use "<" to start tweens together
    const DEFAULT_STAGGER = '<0.2';

    //get itema
    const items = gsap.utils.toArray(`[${ATTRIBUTE}]`);
    if (items.length === 0) return;

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power1.out',
        duration: 0.6,
      },
    });
    //anything that needs to be set to start the interaction happens here

    //h1 load tween
    const loadHeading = function (item) {
      //split the text
      const splitText = runSplit(item, 'lines, words, chars');
      if (!splitText) return;
      // get the position attribute
      const position = attr('<', item.getAttribute(POSITION));
      tl.set(item, { opacity: 1 });
      tl.fromTo(
        splitText.chars,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: 'power1.out',
          stagger: { amount: 0.4, from: 'random' },
        },
        position
      );
    };
    //images load tween
    const loadImage = function (item) {
      // get the position attribute or set defautl position
      const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
      tl.fromTo(item, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1 }, position);
    };
    //default load tween
    const loadItem = function (item) {
      // get the position attribute
      const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
      tl.fromTo(item, { opacity: 0, y: '2rem' }, { opacity: 1, y: '0rem' }, position);
    };

    //add item tween to each element in this parent
    const loadStagger = function (item) {
      if (!item) return;
      //set opacity to 1
      // get the children of the item
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child, index) => {
        //first item set parent opacity to 1
        if (index === 0) {
          item.style.opacity = 1;
        }
        loadItem(child);
      });
    };

    //get all elements and apply animations
    items.forEach((item) => {
      if (!item) return;
      //find the type of the scrolling animation
      const loadType = item.getAttribute(ATTRIBUTE);
      if (loadType === HEADING) {
        loadHeading(item);
      }
      if (loadType === IMAGE) {
        loadImage(item);
      }
      if (loadType === ITEM) {
        loadItem(item);
      }
      if (loadType === STAGGER) {
        loadStagger(item);
      }
    });

    //Play interaction on page load
    tl.play(0);

    // Alternatively use the returned tl to trigger the interaction after transition or image load
    return tl;
  };

  const scrollIn = function () {
    // selectors
    const ATTRIBUTE = 'data-scrollin';
    // types of scrolling elements (value for scrollin element attribute)
    const HEADING = 'heading';
    const SUBHEADING = 'subheading';
    const PANEL = 'panel';
    const ITEM = 'item';
    const CONTAINER = 'container';
    const STAGGER = 'stagger';
    const RICH_TEXT = 'rich-text';
    const IMAGE = 'image';
    const LINE = 'line';

    //options
    const SCROLL_START = 'data-scrollin-start';
    const SCROLL_END = 'data-scrollin-end';
    const SCROLL_STAGGER_X = 'data-scrollin-stagger-x';
    const CLIP_DIRECTION = 'data-scrollin-direction';

    //resuable timeline creation with option attributes for individual customization per element
    const scrollInTL = function (item, options = {}) {
      // default GSAP options
      const settings = {
        start: 'top 90%',
        end: 'top 60%',
      };
      if (options.scrub !== true) {
        settings.toggleActions = 'play none none none';
      } else {
        settings.scrub = true;
      }

      //override settings if an attribute is present and a valid type.
      settings.start = attr(settings.start, item.getAttribute(SCROLL_START));
      settings.end = attr(settings.end, item.getAttribute(SCROLL_END));
      const tl = gsap.timeline({
        defaults: {
          duration: 0.6,
          ease: 'power1.out',
        },
        scrollTrigger: {
          trigger: item,
          start: settings.start,
          end: settings.end,
          toggleActions: settings.toggleActions,
          scrub: settings.scrub,
        },
      });
      return tl;
    };

    //resuable timeline creation with option attributes for individual customization per element
    const defaultTween = function (item, tl, options = {}) {
      const varsFrom = {
        opacity: 0,
        y: '2rem',
      };
      const varsTo = {
        opacity: 1,
        y: '0rem',
      };
      //optional adjustments to the tween
      // {stagger: large}
      if (options.stagger === true) {
        varsTo.stagger = { each: 0.1, from: 'start' };
      }
      // putting tween together
      const tween = tl.fromTo(item, varsFrom, varsTo);
      return tween;
    };

    const scrollInHeading = function (item) {
      //split the text
      const splitText = runSplit(item, 'lines, words, chars');
      if (!splitText) return;
      //set heading to full opacity (check to see if needed)
      // item.style.opacity = 1;
      const tl = scrollInTL(item);
      tl.fromTo(
        splitText.chars,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: 'power1.out',
          stagger: { amount: 0.4, from: 'random' },
        }
      );
      //add event calleback to revert text on completion
      tl.eventCallback('onComplete', () => {
        // splitText.revert();
      });
    };

    const scrollInSubHeading = function (item) {
      //split the text
      const splitText = runSplit(item);
      if (!splitText) return;
      //set heading to full opacity (check to see if needed)
      // item.style.opacity = 1;
      const tl = scrollInTL(item, { scrub: true });
      tl.fromTo(
        splitText.words,
        {
          opacity: 0.2,
        },
        {
          opacity: 1,
          ease: 'power1.out',
          stagger: { each: 0.4 },
        }
      );
    };

    const scrollInItem = function (item) {
      if (!item) return;
      const tl = scrollInTL(item);
      const tween = defaultTween(item, tl);
    };

    //utility function to get the clipping direction of items (horizontal or vertical only)
    const getCLipStart = function (item) {
      //set defautl direction
      let defaultDirection = 'top';
      let clipStart;
      //get the clip direction
      const direction = attr(defaultDirection, item.getAttribute(CLIP_DIRECTION));
      const clipDirections = {
        left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      };
      //check for each possible direction and map it to the correct clipping value
      if (direction === 'left') {
        clipStart = clipDirections.left;
      }
      if (direction === 'right') {
        clipStart = clipDirections.right;
      }
      if (direction === 'top') {
        clipStart = clipDirections.top;
      }
      if (direction === 'bottom') {
        clipStart = clipDirections.bottom;
      }
      return clipStart;
    };

    const scrollInImage = function (item) {
      //item is the image wrap for this animation
      if (!item) return;
      //set clip path directions
      //create timeline
      const tl = scrollInTL(item);
      tl.fromTo(
        item,
        {
          filter: 'blur(32px)',
        },
        {
          filter: 'blur(0px)',
          duration: 0.6,
        }
      );
    };

    const scrollInPanel = function (item) {
      //item is the image wrap for this animation
      if (!item) return;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'top 50%',
          markers: false,
          scrub: true,
        },
        defaults: {
          duration: 1,
          ease: 'none',
        },
      });
      tl.fromTo(
        item,
        {
          scale: 0.8,
          y: '4rem',
        },
        {
          scale: 1,
          y: '0rem',
        }
      );
    };

    const scrollInLine = function (item) {
      if (!item) return;
      //set clip path directions
      const clipStart = getCLipStart(item);
      const clipEnd = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      //create timeline
      const tl = scrollInTL(item);
      tl.fromTo(
        item,
        {
          clipPath: clipStart,
        },
        {
          clipPath: clipEnd,
        }
      );
    };

    const scrollInContainer = function (item) {
      if (!item) return;
      //get the children of the item
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child) => {
        const tl = scrollInTL(child);
        const tween = defaultTween(child, tl);
      });
    };

    const scrollInStagger = function (item) {
      if (!item) return;

      // get the children of the item
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      const tl = scrollInTL(item);
      const tween = defaultTween(children, tl, { stagger: true });
    };

    const scrollInRichText = function (item) {
      if (!item) return;
      //get the children of the item
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child) => {
        const childTag = child.tagName;
        //apply the items animation based on the child type
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(childTag)) {
          scrollInHeading(child);
        }
        if (childTag === 'FIGURE') {
          scrollInImage(child);
        } else {
          scrollInItem(child);
        }
      });
    };

    //get all elements and apply animations
    const items = gsap.utils.toArray(`[${ATTRIBUTE}]`);
    items.forEach((item) => {
      if (!item) return;
      //find the type of the scrolling animation and apply it to the element
      const scrollInType = item.getAttribute(ATTRIBUTE);
      if (scrollInType === HEADING) {
        scrollInHeading(item);
      }
      if (scrollInType === SUBHEADING) {
        scrollInSubHeading(item);
      }
      if (scrollInType === PANEL) {
        scrollInPanel(item);
      }
      if (scrollInType === ITEM) {
        scrollInItem(item);
      }
      if (scrollInType === IMAGE) {
        scrollInImage(item);
      }
      if (scrollInType === LINE) {
        scrollInLine(item);
      }
      if (scrollInType === CONTAINER) {
        scrollInContainer(item);
      }
      if (scrollInType === STAGGER) {
        scrollInStagger(item);
      }
      if (scrollInType === RICH_TEXT) {
        scrollInRichText(item);
      }
    });
  };

  //////////////////////////////
  //sliders
  const homeUsesSlider = function () {
    //Swiper selectors
    const COMPONENT = '.home-uses_component';
    //Button selectors
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    const SCROLLBAR = '.swiper-scrollbar';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';

    const components = gsap.utils.toArray(COMPONENT).forEach(function (component) {
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
            slidesPerView: 'auto',
            spaceBetween: 0,
          },
          // tablet
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // desktop
          992: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
        speed: 600,
        loop: false,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
        navigation: {
          nextEl: nextButtonEl,
          prevEl: previousButtonEl,
          disabledClass: DISABLED_CLASS,
        },
        scrollbar: {
          el: scrollbar,
          draggable: true,
        },
        on: {
          slideChange: function () {
            // console.log('title swiper:', this.activeIndex);
          },
        },
      });
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

  const logosSlider = function () {
    //Swiper selectors
    const COMPONENT = '.logo-marquee_component';
    const SLIDER = '.swiper';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';

    const components = gsap.utils.toArray(COMPONENT);
    components.forEach(function (component) {
      if (!component) return;
      const slider = component.querySelector(SLIDER);
      if (!slider) return;
      const swiper = new Swiper(slider, {
        speed: 800,
        breakpoints: {
          // mobile
          320: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // tablet
          768: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
          // desktop
          992: {
            slidesPerView: 4,
            spaceBetween: 48,
          },
          1320: {
            slidesPerView: 5,
            spaceBetween: 48,
          },
        },
        loop: true,
        autoplay: { delay: 1000 },
        centeredSlides: true,
        allowTouchMove: true,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
      });
    });
  };

  //Control Functions on page load
  load();
  scrollIn();
  homeUsesSlider();
  testimonialsSlider();
  logosSlider();
  // homeFeaturesScroll()
});
