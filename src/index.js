// Notable AI Platform Scroll
// v1.0
document.addEventListener('DOMContentLoaded', function () {
  const platformScroll = function () {
    //selectors
    const WRAP = '[data-ix-platform="wrap"]';
    const ROW = '[data-ix-platform="row"]';
    const CARD = '[data-ix-platform="card"]';
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
      console.log(row, spacer);

      //guard clause
      if (!row) return;
      const scrollAnimation = function () {
        flipCtx && flipCtx.revert();

        flipCtx = gsap.context(() => {
          //get state
          let startState = Flip.getState([row, cards], { nested: true, props: 'opacity' });
          //modify state
          cards.forEach(function (card, index) {
            card.classList.add(ACTIVE_CLASS);
          });
          let endState = Flip.getState([row, cards], { nested: true, props: 'opacity' });
          //modify state
          // cards.forEach(function (card, index) {
          //   card.classList.remove(ACTIVE_CLASS);
          // });

          const flipConfig = {
            ease: 'none',
            absolute: false,
            scale: false,
          };
          // const flipIn = Flip.fromTo(startState, endState, flipConfig);
          // const flipOut = Flip.to(startState, flipConfig);
          const tl = Flip.fromTo(startState, endState, {
            ease: 'none',
            absolute: false,
            scale: false,
            scrollTrigger: {
              trigger: spacer,
              start: 'top 100%',
              end: 'top 50%',
              scrub: true,
              markers: true,
            },
          });

          const tl2 = Flip.to(startState, {
            ease: 'none',
            absolute: false,
            scale: false,
            scrollTrigger: {
              trigger: spacer,
              start: 'bottom 0%',
              end: 'bottom 50%',
              scrub: true,
              markers: true,
            },
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
    return () => {
      //this code will run when the media query stops matching
    };
  });
});

/*

function expandSquares() {
 const tween = gsap.to('.square', {
    height: '50px',
    width: '50px',
    rotate: 360,
  })
 
 return tween 
}

function flipSquaresToRow(tl) {
  squareContainer = document.querySelector('.square-container')
  
  const state = Flip.getState('.square')
  squareContainer.style.gridTemplateColumns = 'repeat(9, 1fr)'
  squareContainer.style.gridTemplateRows = '1fr'
  squareContainer.style.gridAutoFlow = 'columns'
  
  const flip = Flip.from(state, {
    onComplete: () => tl.resume()
  })
  
  return flip
}

function flipSquaresToColumn(tl) {
    squareContainer = document.querySelector('.square-container')
  
  const state = Flip.getState('.square')
  squareContainer.style.gridTemplateColumns = '1fr'
  squareContainer.style.gridTemplateRows = 'repeat(9, 1fr)'
  squareContainer.style.gridAutoFlow = 'rows'
  
  const flip = Flip.from(state, {
    onComplete: () => tl.resume()
  })
  return flip
}

function masterTL() {
  t1 = gsap.timeline()
  
  t1.add(expandSquares())
  t1.addPause(">", () => flipSquaresToRow(t1))
  t1.addPause("+=0.00001", () => flipSquaresToColumn(t1))
  // t1.call(flipSquaresToRow, null, ">")
  // t1.call(flipSquaresToColumn, null, ">")
}

masterTL()
*/
