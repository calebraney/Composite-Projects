// Notable AI Platform Scroll
// v1.0
document.addEventListener('DOMContentLoaded', function () {
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
});
