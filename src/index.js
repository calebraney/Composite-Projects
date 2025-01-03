// Notable home animations
// v1.3
document.addEventListener('DOMContentLoaded', function () {
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const homeSlider = function () {
    //Swiper selectors
    const COMPONENT = '.notable_slider_component';
    const SLIDER = '.swiper';
    //Button selectors
    const NEXT_BUTTON = '.swiper-next';
    const PREVIOUS_BUTTON = '.swiper-prev';
    //classes
    const ACTIVE_CLASS = 'is-active';
    const DISABLED_CLASS = 'is-disabled';
    const components = [...document.querySelectorAll(COMPONENT)];
    components.forEach(function (component) {
      if (!component) return;
      const slider = component.querySelector(SLIDER);
      // const nextButtonEl = component.querySelector(NEXT_BUTTON);
      // const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
      if (!slider || !component) return;

      const swiper = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 56,
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        parallax: true,
        allowTouchMove: false,
        mousewheel: false,
        keyboard: false,
        slideActiveClass: ACTIVE_CLASS,
        slideDuplicateActiveClass: ACTIVE_CLASS,
        effect: 'creative',
        creativeEffect: {
          next: {
            // Array with translate X, Y and Z values
            translate: ['60%', 0, 0],
            opacity: 0,
          },
          prev: {
            // Array with translate X, Y and Z values
            translate: ['-60%', 0, 0],
            opacity: 0,
          },
        },
        // fadeEffect: {
        //   crossFade: true,
        // },

        // on: {
        //   slideChange: function () {
        //     // console.log('title swiper:', this.activeIndex);
        //   },
        // },
      });
    });
  };
  homeSlider();

  const homeOrbPulse = function () {
    const ITEM = '[data-ix-platform-orb="item"]';
    const orbs = [...document.querySelectorAll(ITEM)];
    if (orbs.length === 0) return;
    let tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    tl.to(orbs, {
      scale: 0.8,
      ease: 'power2.InOut',
      duration: 1.2,
      stagger: { each: 0.2, repeat: -1, yoyo: true },
    });
  };
  homeOrbPulse();

  //////////////////////////////
  //Control Functions on page load

  let mm = gsap.matchMedia();

  mm.add('(min-width: 992px)', () => {
    // the code will only run if the media query matches
    homeScroll();
    return () => {
      //this code will run when the media query stops matching
    };
  });
});

//lottie resize
var Webflow = Webflow || [];
Webflow.push(function () {
  window.addEventListener('resize', function () {
    window.Webflow.require('lottie').lottie.resize();
  });
});

//////////////////////////////
//OLD HOME SCROLL ANIMATION
// const homeScroll = function () {
//   const SECTION_CLASS = '.home_sticky-section';
//   const CARD_WRAP_CLASS = '.home_sticky-card-wrapper';
//   const CARD_CLASS = '.home_sticky-card';
//   const BG_CLASS = '.home_sticky-card-bg';
//   const UI_CLASS = '.sticky_home-img-ui';
//   const IMG_CLASS = '.home_sticky-img';
//   const card1 = document.querySelector(`${CARD_CLASS}.is-1`);
//   const card2 = document.querySelector(`${CARD_CLASS}.is-2`);
//   const card3 = document.querySelector(`${CARD_CLASS}.is-3`);
//   const bg1 = document.querySelector(`${BG_CLASS}.is-1`);
//   const bg2 = document.querySelector(`${BG_CLASS}.is-2`);
//   const bg3 = document.querySelector(`${BG_CLASS}.is-3`);
//   const cardWrap = document.querySelector(CARD_WRAP_CLASS);
//   const section = document.querySelector(SECTION_CLASS);
//   const img2 = document.querySelector(`${IMG_CLASS}.is-2`);
//   const img3 = document.querySelector(`${IMG_CLASS}.is-3`);

//   if (!card1 || !section || !cardWrap) return;
//   const ui1 = card1.querySelector(UI_CLASS);
//   const ui2 = card2.querySelector(UI_CLASS);
//   const ui3 = card3.querySelector(UI_CLASS);

//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: section,
//       start: 'top 0%',
//       end: 'bottom bottom',
//       ease: 'power1.out',
//       markers: false,
//       scrub: 0.5,
//     },
//     defaults: {
//       duration: 1,
//       ease: 'none',
//     },
//   });
//   tl.set([ui2, ui3, img2, img3], {
//     opacity: 0,
//   });
//   tl.fromTo(
//     card2,
//     {
//       scale: 0.9,
//       y: '0.25rem',
//     },
//     {
//       scale: 1,
//       y: '-5.25rem',
//     }
//   );
//   tl.fromTo(
//     card3,
//     {
//       y: '5.25rem',
//       scale: 0.8,
//     },
//     {
//       y: '0rem',
//       scale: 0.9,
//     },
//     '<'
//   );
//   tl.fromTo(
//     card1,
//     {
//       y: '0rem',
//     },
//     {
//       y: '-8.5rem',
//     },
//     '<'
//   );
//   tl.fromTo(
//     bg2,
//     {
//       opacity: 0,
//     },
//     {
//       opacity: 1,
//       duration: 0.5,
//     },
//     '<'
//   );
//   tl.to(
//     bg1,
//     {
//       opacity: 0,
//       duration: 0.5,
//     },
//     '<.25'
//   );
//   tl.fromTo(
//     ui2,
//     {
//       opacity: 0,
//       x: '-10%',
//       scale: 0.8,
//     },
//     {
//       opacity: 1,
//       x: '0%',
//       scale: 1,
//       duration: 0.5,
//     },
//     '<'
//   );
//   // Added IMG2 transition in sync with UI2
//   tl.fromTo(
//     img2,
//     {
//       opacity: 0,
//     },
//     {
//       opacity: 1,
//       duration: 0.5,
//     },
//     '<' // Ensures IMG2 animates in sync with UI2
//   );
//   tl.to(card3, {
//     y: '0rem',
//     scale: 1,
//   });
//   tl.fromTo(
//     bg3,
//     {
//       opacity: 0,
//     },
//     {
//       opacity: 1,
//       duration: 0.5,
//     },
//     '<'
//   );
//   tl.to(
//     bg2,
//     {
//       opacity: 0,
//       duration: 0.5,
//     },
//     '<.25'
//   );
//   tl.fromTo(
//     ui3,
//     {
//       opacity: 0,
//       x: '-10%',
//       scale: 0.8,
//     },
//     {
//       opacity: 1,
//       x: '0%',
//       scale: 1,
//       duration: 0.5,
//     },
//     '<'
//   );
//   // Added IMG3 transition in sync with UI3
//   tl.fromTo(
//     img3,
//     {
//       opacity: 0,
//     },
//     {
//       opacity: 1,
//       duration: 0.5,
//     },
//     '<' // Ensures IMG3 animates in sync with UI3
//   );
// };
