// Notable AI Platform Scroll
// v1.5
document.addEventListener('DOMContentLoaded', function () {
  const lightLogo = document.querySelector('.logo-primary-img.is-light-gradient');
  const darkLogo = document.querySelector('.logo-primary-img.is-dark-gradient');
  const navbar = document.querySelector('nav');
  const navBg = document.querySelector('.nav_bg');
  const linkText = document.querySelectorAll('.nav_link-text');
  const linkLines = document.querySelectorAll('.nav_link-underline');
  const navUnderline = document.querySelector('.nav_underline');

  console.log('hi');
  const tl = gsap.timeline({
    paused: true,
    delay: 0.4,

    defaults: {
      ease: 'power1.out',
      duration: 0.3,
    },
  });
  tl.to(
    {},
    {
      duration: 0.6,
    }
  );
  tl.fromTo(
    linkText,
    {
      color: 'white',
    },
    {
      color: 'inherit',
    }
  );
  tl.fromTo(
    [linkLines, navUnderline, navBg],
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    '<'
  );
  tl.progress(0);
  function darkNav() {
    lightLogo.style.display = 'none';
    darkLogo.style.display = 'block';
  }
  function lightNav() {
    lightLogo.style.display = 'block';
    darkLogo.style.display = 'none';
  }
  function scrollDirectionListener() {
    //check the current scroll distance from the top
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    //compare current scroll distance to last scroll distance
    console.log(currentScroll);
    if (currentScroll === 0) {
      //if use is at the top
      darkNav();
      tl.reverse();
    } else {
      //user is not at the top
      lightNav();
      tl.play();
    }
  }
  scrollDirectionListener();
  window.addEventListener('scroll', scrollDirectionListener);
  /*
  const platformScroll = function () {
    //selectors
    const WRAP = '[data-ix-platform="wrap"]';
    const ROW = '[data-ix-platform="row"]';
    const CARD = '[data-ix-platform="card"]';
    const CARD_TEXT = '[data-ix-platform="card"] .ai-platform-card_text';
    const SPACER = '[data-ix-platform="spacer"]';

    const ACTIVE_CLASS = 'is-active';

    //elements
    const rows = [...document.querySelectorAll(ROW)];
    const spacers = [...document.querySelectorAll(SPACER)];
    if (rows.length === 0) return;
    //for each row
    rows.forEach(function (row, index) {
      let flipCtx;
      const spacer = spacers[index];
      const cards = [...row.querySelectorAll(CARD)];
      const cardText = [...row.querySelectorAll(CARD_TEXT)];

      //guard clause
      if (!row) return;

      const scrollAnimation = function () {
        flipCtx && flipCtx.revert();

        flipCtx = gsap.context(() => {
          const flipConfig = {
            ease: 'none',
            absolute: false,
            scale: false,
          };
          const stateConfig = {
            nested: true,
            props: 'opacity,color',
          };

          //get starting state
          let startState = Flip.getState([row, cards], stateConfig);
          //modify state
          cards.forEach(function (card, index) {
            card.classList.add(ACTIVE_CLASS);
          });
          //get ending state
          let endState = Flip.getState([row, cards], stateConfig);

          //create the flip from and to each state
          const flip = Flip.fromTo(startState, endState, flipConfig);
          //create a timeline and add the flip to it
          const tl = gsap.timeline({
            paused: true,
          });
          tl.add(flip);
          //optionally add other tweens into the timeline
          tl.fromTo(cardText, { opacity: 0.25 }, { opacity: 1 }, '<');

          //update the timeline based on a scrolltrigger
          ScrollTrigger.create({
            trigger: spacer,
            start: 'clamp(top 100%)',
            end: 'top 60%',
            scrub: true,
            markers: false,
            onUpdate: (scroll) => {
              tl.progress(scroll.progress);
            },
          });
          ScrollTrigger.create({
            trigger: spacer,
            start: 'top 40%',
            end: 'top 0%',
            scrub: true,
            markers: false,
            onUpdate: (scroll) => {
              tl.progress(1 - scroll.progress);
            },
          });
        });
      };
      scrollAnimation();
    });
  };

  //Control Functions on page load
  let mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    // the code will only run if the media query matches
    platformScroll();

    //force page to reload on resize
    let windowWidth = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth !== windowWidth) {
        location.reload();
        console.log('reload');
      }
    });

    //force page to top on reaload
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  });
  */
});

$(document).ready(function () {
  $('.slider-main_component.is-testimonial').each(function () {
    let loopMode = $(this).data('loop-mode') === true;
    let sliderDuration = $(this).data('slider-duration') || 300;

    new Swiper($(this).find('.swiper.is-testimonial')[0], {
      speed: sliderDuration,
      loop: true,
      autoHeight: false,
      centeredSlides: loopMode,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 'auto',
      spaceBetween: '3%',
      rewind: false,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        480: {
          slidesPerView: '1',
          spaceBetween: '2%',
        },
        768: {
          slidesPerView: '1',
          spaceBetween: '2%',
        },
        992: {
          slidesPerView: '1',
          spaceBetween: '2%',
        },
      },
      navigation: {
        nextEl: $(this).find('.swiper-next')[0],
        prevEl: $(this).find('.swiper-prev')[0],
        disabledClass: 'is-disabled',
      },
      pagination: {
        el: $(this).find('.swiper-bullet-wrapper')[0],
        bulletActiveClass: 'is-active',
        bulletClass: 'swiper-bullet',
        bulletElement: 'button',
        clickable: true,
      },
      slideActiveClass: 'is-active',
      slideDuplicateActiveClass: 'is-active',
    });
  });
});
