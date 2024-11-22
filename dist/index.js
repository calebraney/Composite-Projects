(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    function LottieScrollTrigger(vars) {
      let playhead = { frame: 0 }, target = gsap.utils.toArray(vars.target)[0], speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" }, st = {
        trigger: target,
        pin: false,
        start: "top 45%",
        end: speeds[vars.speed] || "+=1000",
        scrub: 1
      }, ctx = gsap.context && gsap.context(), animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || "svg",
        loop: false,
        autoplay: false,
        path: vars.path,
        rendererSettings: vars.rendererSettings || {
          preserveAspectRatio: "xMidYMid slice"
        }
      });
      for (let p in vars) {
        st[p] = vars[p];
      }
      animation.addEventListener("DOMLoaded", function() {
        let createTween = function() {
          animation.frameTween = gsap.to(playhead, {
            frame: animation.totalFrames - 1,
            ease: "none",
            onUpdate: () => animation.goToAndStop(playhead.frame, true),
            scrollTrigger: st
          });
          return () => animation.destroy && animation.destroy();
        };
        ctx && ctx.add ? ctx.add(createTween) : createTween();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      return animation;
    }
    const setupLotties = function() {
      const SECTION = ".section";
      const LOTTIE_WRAP = ".flow-split_image-wrap";
      const LOTTIE_EL = ".flow-split_image";
      const SCROLL_TRIGGER = ".flow-split_content";
      const ACTIVE_CLASS = "is-active";
      const sections = [...document.querySelectorAll(SECTION)];
      sections.forEach((section, index) => {
        const scrollTriggers = [...section.querySelectorAll(SCROLL_TRIGGER)];
        const items = [...section.querySelectorAll(LOTTIE_WRAP)];
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        items.forEach((item, index2) => {
          const scrollTrigger = scrollTriggers[index2];
          const lottieOld = item.querySelector(LOTTIE_EL);
          let lottieNew, animation;
          if (!item || !scrollTrigger) return;
          const lottiePath = lottieOld.dataset.src;
          const vars = {
            trigger: scrollTrigger,
            start: "top center",
            end: "bottom center",
            markers: false,
            scrub: 1
            // seconds it takes for the playhead to "catch up"
          };
          const animationType = lottieOld.dataset.animationType;
          let lottieAnimation = true;
          if (animationType !== "lottie") {
            lottieAnimation = false;
          }
          if (lottieAnimation) {
            lottieOld.remove();
            lottieNew = document.createElement("div");
            item.appendChild(lottieNew);
            lottieNew.classList.add(LOTTIE_EL);
            animation = LottieScrollTrigger({
              trigger: vars.trigger,
              target: lottieNew,
              path: lottiePath,
              start: vars.start,
              end: vars.end,
              markers: vars.markers,
              scrub: vars.scrub
            });
          }
          const activateItem = function(activate = true) {
            if (activate) {
              item.classList.add(ACTIVE_CLASS);
              if (lottieAnimation) {
                animation.play();
                console.log("play", index2);
              }
            } else {
              item.classList.remove(ACTIVE_CLASS);
            }
          };
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: vars.trigger,
              start: vars.start,
              end: vars.end,
              markers: vars.markers,
              scrub: vars.scrub,
              onEnter: () => {
                activateItem();
              },
              onLeave: () => {
                if (item !== lastItem) {
                  activateItem(false);
                }
              },
              onEnterBack: () => {
                activateItem();
              },
              onLeaveBack: () => {
                if (item !== firstItem) {
                  activateItem(false);
                }
              }
            }
          });
        });
      });
    };
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      setupLotties();
      return () => {
      };
    });
  });
})();
