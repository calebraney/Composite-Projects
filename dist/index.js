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
      const CARD_TEXT = '[data-ix-platform="card"] .ai-platform-card_text';
      const SPACER = '[data-ix-platform="spacer"]';
      const ACTIVE_CLASS = "is-active";
      const rows = [...document.querySelectorAll(ROW)];
      const spacers = [...document.querySelectorAll(SPACER)];
      if (rows.length === 0) return;
      rows.forEach(function(row, index) {
        let flipCtx;
        const spacer = spacers[index];
        const cards = [...row.querySelectorAll(CARD)];
        const cardText = [...row.querySelectorAll(CARD_TEXT)];
        if (!row) return;
        const scrollAnimation = function() {
          flipCtx && flipCtx.revert();
          flipCtx = gsap.context(() => {
            const flipConfig = {
              ease: "none",
              absolute: false,
              scale: false
            };
            const stateConfig = {
              nested: true,
              props: "opacity,color"
            };
            let startState = Flip.getState([row, cards], stateConfig);
            cards.forEach(function(card, index2) {
              card.classList.add(ACTIVE_CLASS);
            });
            let endState = Flip.getState([row, cards], stateConfig);
            const flip = Flip.fromTo(startState, endState, flipConfig);
            const tl = gsap.timeline({
              paused: true
            });
            tl.add(flip);
            tl.fromTo(cardText, { opacity: 0.25 }, { opacity: 1 }, "<");
            ScrollTrigger.create({
              trigger: spacer,
              start: "clamp(top 100%)",
              end: "top 60%",
              scrub: true,
              markers: false,
              onUpdate: (scroll) => {
                tl.progress(scroll.progress);
              }
            });
            ScrollTrigger.create({
              trigger: spacer,
              start: "top 40%",
              end: "top 0%",
              scrub: true,
              markers: false,
              onUpdate: (scroll) => {
                tl.progress(1 - scroll.progress);
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
      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function() {
        if (window.innerWidth !== windowWidth) {
          location.reload();
          console.log("reload");
        }
      });
      window.onbeforeunload = function() {
        window.scrollTo(0, 0);
      };
    });
  });
})();
