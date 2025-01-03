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
        if (!row) return;
        const scrollAnimation = function() {
          flipCtx && flipCtx.revert();
          flipCtx = gsap.context(() => {
            let startState = Flip.getState([row, cards], { nested: true, props: "opacity" });
            cards.forEach(function(card, index2) {
              card.classList.add(ACTIVE_CLASS);
            });
            let endState = Flip.getState([row, cards], { nested: true, props: "opacity" });
            const flipConfig = {
              ease: "none",
              absolute: false,
              scale: false
            };
            const tl = Flip.fromTo(startState, endState, {
              ease: "none",
              absolute: false,
              scale: false,
              scrollTrigger: {
                trigger: spacer,
                start: "top 100%",
                end: "top 50%",
                scrub: true,
                markers: true
              }
            });
            const tl2 = Flip.to(startState, {
              ease: "none",
              absolute: false,
              scale: false,
              scrollTrigger: {
                trigger: spacer,
                start: "bottom 0%",
                end: "bottom 50%",
                scrub: true,
                markers: true
              }
            });
          });
        };
        scrollAnimation();
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
