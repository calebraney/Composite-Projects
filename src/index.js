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

          const flip = Flip.fromTo(startState, endState, flipConfig);
          const tl = gsap.timeline({
            paused: true,
          });
          tl.add(flip);
          tl.fromTo(cardText, { opacity: 0.25 }, { opacity: 1 }, '<');

          ScrollTrigger.create({
            trigger: spacer,
            start: 'top 100%',
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

    return () => {
      //this code will run when the media query stops matching
    };
  });
});

///////////////////////////////////////////

// animate with Flip
// const tl = Flip.fromTo(startState, endState, {
//   ease: 'none',
//   absolute: true,
//   scale: true,
//   scrollTrigger: {
//     trigger: spacer,
//     start: 'top 100%',
//     end: 'top 50%',
//     scrub: true,
//     markers: true,
//   },
// });
// animate with Flip
// const tlOut = Flip.to(startState, {
//   ease: 'none',
//   absolute: true,
//   scale: true,
//   scrollTrigger: {
//     trigger: spacer,
//     start: 'bottom 0%',
//     end: 'bottom 50%',
//     scrub: true,
//     markers: true,
//   },
// });

// ScrollTrigger.create({
//   trigger: spacer,
//   start: 'top 100%',
//   end: 'top 50%',
//   scrub: true,
//   markers: true,
//   animation: flipIn,
// });
// const reversedFlip = flipIn.reverse();

// ScrollTrigger.create({
//   trigger: spacer,
//   start: 'bottom 99%',
//   end: 'bottom 5%',
//   scrub: true,
//   markers: true,
//   animation: reversedFlip,
// });

/*
  function getStates() {
        //get state
        startState = Flip.getState(cards, stateConfig);
        //modify state
        cards.forEach(function (card, index) {
          card.classList.add(ACTIVE_CLASS);
        });
        endState = Flip.getState(cards, stateConfig);
        //modify state
        cards.forEach(function (card, index) {
          card.classList.remove(ACTIVE_CLASS);
        });
      }

      function flipActivateCard(tl) {
        //get state
        let state = Flip.getState(cards, stateConfig);
        //modify state
        cards.forEach(function (card, index) {
          card.classList.add(ACTIVE_CLASS);
        });

        const flip = Flip.from(state, {
          ease: 'none',
          absolute: false,
          scale: false,
          // onComplete: () => tl.resume(),
        });

        return flip;
      }

      function flipDeactivateCard(tl) {
        //get state
        let state = Flip.getState(cards, stateConfig);
        //modify state
        cards.forEach(function (card, index) {
          card.classList.remove(ACTIVE_CLASS);
        });

        const flip = Flip.from(state, {
          ease: 'none',
          absolute: false,
          scale: false,
          // onComplete: () => tl.resume(),
        });
        return flip;
      }

      function masterTL() {
        flipCtx && flipCtx.revert();

        flipCtx = gsap.context(() => {
          // getStates();
          const t1 = gsap.timeline({
            scrollTrigger: {
              trigger: spacer,
              start: 'top 100%',
              end: 'top 60%',
              scrub: true,
              markers: true,
            },
            onComplete: () => {
              timeline2();
            },
          });
          t1.add(flipActivateCard(t1));

          const timeline2 = function () {
            const t2 = gsap.timeline({
              scrollTrigger: {
                trigger: spacer,
                start: 'top 40%',
                end: 'top 0%',
                scrub: true,
                markers: true,
              },
            });
            t2.add(flipDeactivateCard(t2));
          };

          // t1.add(expandSquares());
          // t1.addPause('+=.5', () => flipDeactivateCard(t1));
          // t1.call(flipSquaresToRow, null, ">")
          // t1.call(flipSquaresToColumn, null, ">")
        });
      }

      masterTL();
*/

/////////////////////////////
// WORKING ONE WAY
/*
  const scrollAnimation = function () {
        flipCtx && flipCtx.revert();

        flipCtx = gsap.context(() => {
          //get state
          let startState = Flip.getState([row, cards], stateConfig);
          //modify state
          cards.forEach(function (card, index) {
            card.classList.add(ACTIVE_CLASS);
          });
          let endState = Flip.getState([row, cards], stateConfig);
          //modify state
          // cards.forEach(function (card, index) {
          //   card.classList.remove(ACTIVE_CLASS);
          // });

          const flip = Flip.fromTo(startState, endState, flipConfig);

          ScrollTrigger.create({
            trigger: spacer,
            start: 'top 100%',
            end: 'top 50%',
            scrub: true,
            markers: true,
            animation: flip,
          });
        });
      };
      scrollAnimation();
*/
