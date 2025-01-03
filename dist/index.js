(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const platformScroll = function() {
      const WRAP = '[data-ix-platform="wrap"]';
      const ROW = '[data-ix-platform="row"]';
      const CARD = '[data-ix-platform="card"]';
      const SPACER = '[data-ix-platform="spacer"]';
      const ACTIVE_CLASS = "is-active";
      const rows = [...document.querySelectorAll(ROW)];
      const spacers = [...document.querySelectorAll(SPACER)];
      if (rows.length === 0) return;
      rows.forEach(function(row, index) {
        let flipCtx;
        const spacer = spacers[index];
        const cards = [...row.querySelectorAll(CARD)];
        console.log(row, spacer);
        let startState;
        let endState;
        const flipConfig = {
          ease: "none",
          absolute: false,
          scale: false
        };
        const stateConfig = {
          nested: true,
          props: "opacity"
        };
        if (!row) return;
        const scrollIn = function() {
          flipCtx && flipCtx.revert();
          flipCtx = gsap.context(() => {
            let startState2 = Flip.getState([row, cards], stateConfig);
            cards.forEach(function(card, index2) {
              card.classList.add(ACTIVE_CLASS);
            });
            let endState2 = Flip.getState([row, cards], stateConfig);
            const flip = Flip.fromTo(startState2, endState2, flipConfig);
            ScrollTrigger.create({
              trigger: spacer,
              start: "top 100%",
              end: "top 50%",
              scrub: true,
              markers: true,
              animation: flip
            });
          });
        };
        scrollIn();
      });
    };
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      platformScroll();
      return () => {
      };
    });
  });
})();
