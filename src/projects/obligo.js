// Obligo Interactions
// v1.1
document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with [data-lightbox="wrap"]

  // attribute value checker
  const attr = function (defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal;
    if (attrVal === 'true' && defaultValType === 'boolean') return true;
    if (attrVal === 'false' && defaultValType === 'boolean') return false;
    if (isNaN(attrVal) && defaultValType === 'string') return attrVal;
    if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal;
    return defaultVal;
  };

  const navBG = function () {
    const navBG = document.querySelector('.navbar_background');
    if (!navBG) return;

    function scrollDirectionListener() {
      //check the current scroll distance from the top
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      //compare current scroll distance to last scroll distance
      if (currentScroll === 0) {
        //if use is at the top
        navBG.style.opacity = '0';
      } else {
        //user is not at the top
        navBG.style.opacity = '1';
      }
    }
    window.addEventListener('scroll', scrollDirectionListener);
  };

  const marquee = function () {
    //animation ID
    const WRAP = '[data-ix-marquee="wrap"]';
    const LIST = '[data-ix-marquee="list"]'; // put on the CMS LIST WRAP element (NOT THE LIST)
    const REVERSE = 'data-ix-marquee-reverse'; // needs to be set to true if reversed
    const DURATION = 'data-ix-marquee-duration'; //set a custom duration in seconds
    const DYNAMIC_DURATION = 'data-ix-marquee-duration-dynamic'; // set to true to make the duration dynamic per amount of items
    const DURATION_PER_ITEM = 'data-ix-marquee-duration-per-item'; // the duration per the amount of items
    const HOVER_EFFECT = 'data-ix-marquee-hover'; //option for hover effect
    const ACCELERATE_ON_HOVER = 'accelerate';
    const DECELERATE_ON_HOVER = 'decelerate';
    const PAUSE_ON_HOVER = 'pause';
    //defaults
    const DEFAULT_DURATION = 30;
    const DEFAULT_DYNAMIC_DURATION = 5;

    //for each wrap
    const wraps = document.querySelectorAll(WRAP);
    if (wraps.length === 0) return;
    wraps.forEach((wrap) => {
      const lists = [...wrap.querySelectorAll(LIST)];
      let reverse = attr(false, wrap.getAttribute(REVERSE));
      let duration = attr(DEFAULT_DURATION, wrap.getAttribute(DURATION));
      let durationDynamic = attr(false, wrap.getAttribute(DYNAMIC_DURATION));
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
  navBG();
  marquee();
});
