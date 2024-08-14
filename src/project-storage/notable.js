// v1.0 homepageinteraction
document.addEventListener('DOMContentLoaded', function () {
    // register gsap plugins if available
    if (gsap.ScrollTrigger !== undefined) {
      gsap.registerPlugin(ScrollTrigger);
    }
    //////////////////////////////
    const homeScroll = function () {
      const SECTION_CLASS = '.home_sticky-section';
      const CARD_WRAP_CLASS = '.home_sticky-card-wrapper';
      const CARD_CLASS = '.home_sticky-card';
      const BG_CLASS = '.home_sticky-card-bg';
      const UI_CLASS = '.sticky_home-img-ui';
      const card1 = document.querySelector(`${CARD_CLASS}.is-1`);
      const card2 = document.querySelector(`${CARD_CLASS}.is-2`);
      const card3 = document.querySelector(`${CARD_CLASS}.is-3`);
      const bg1 = document.querySelector(`${BG_CLASS}.is-1`);
      const bg2 = document.querySelector(`${BG_CLASS}.is-2`);
      const bg3 = document.querySelector(`${BG_CLASS}.is-3`);
      const cardWrap = document.querySelector(CARD_WRAP_CLASS);
      const section = document.querySelector(SECTION_CLASS);
  
      if (!card1 || !section || !cardWrap) return;
      const ui1 = card1.querySelector(UI_CLASS);
      const ui2 = card2.querySelector(UI_CLASS);
      const ui3 = card3.querySelector(UI_CLASS);
  
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 0%',
          end: 'bottom bottom',
          ease: 'power1.out',
          markers: false,
          scrub: 0.5,
        },
        defaults: {
          duration: 1,
          ease: 'none',
        },
      });
      tl.set([ui2, ui3], {
        opacity: 0,
      });
      tl.fromTo(
        card2,
        {
          scale: 0.9,
          y: '0.25rem',
        },
        {
          scale: 1,
          y: '-5.25rem',
        }
      );
      tl.fromTo(
        card3,
        {
          y: '5.25rem',
          scale: 0.8,
        },
        {
          y: '0rem',
          scale: 0.9,
        },
        '<'
      );
      tl.fromTo(
        card1,
        {
          y: '0rem',
        },
        {
          y: '-8.5rem',
        },
        '<'
      );
      tl.fromTo(
        bg2,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        '<'
      );
      tl.to(
        bg1,
        {
          opacity: 0,
          duration: 0.5,
        },
        '<.25'
      );
      tl.fromTo(
        ui2,
        {
          opacity: 0,
          x: '-10%',
          scale: 0.8,
        },
        {
          opacity: 1,
          x: '0%',
          scale: 1,
          duration: 0.5,
        },
        '<'
      );
      tl.to(card3, {
        y: '0rem',
        scale: 1,
      });
      tl.fromTo(
        bg3,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        '<'
      );
      tl.to(
        bg2,
        {
          opacity: 0,
          duration: 0.5,
        },
        '<.25'
      );
      tl.fromTo(
        ui3,
        {
          opacity: 0,
          x: '-10%',
          scale: 0.8,
        },
        {
          opacity: 1,
          x: '0%',
          scale: 1,
          duration: 0.5,
        },
        '<'
      );
    };
  
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
  