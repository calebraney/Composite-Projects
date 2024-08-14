// v1.0 homepageinteraction
document.addEventListener('DOMContentLoaded', function () {
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  //////////////////////////////
  //home scrolling interaction
  const homeScroll = function () {
    //selectors
    const SECTION_CLASS = '.home_hero-scroll';
    const CONTENT_CLASS = '.home-hero_sticky';
    const BG_CLASS = '.home_hero-bg';
    const LOTTIE_EL = '.home_lottie';
    //elements
    const section = document.querySelector(SECTION_CLASS);
    const lottieEl = document.querySelector(LOTTIE_EL);
    const content = document.querySelector(CONTENT_CLASS);
    const lottiePath = lottieEl.dataset.src;
    //guard clause
    if (!section || !content || !lottieEl) return;
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        ease: 'none',
        markers: false,
        scrub: true,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    tl.fromTo(
      content,
      {
        yPercent: 0,
      },
      {
        yPercent: 50,
      }
    );
    //lottie scrolltrigger function
    function LottieScrollTrigger(vars) {
      let playhead = { frame: 0 },
        target = gsap.utils.toArray(vars.target)[0],
        speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' },
        st = {
          trigger: target,
          pin: false,
          start: 'top center',
          end: speeds[vars.speed] || '+=1000',
          scrub: 1,
        },
        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
          container: target,
          renderer: vars.renderer || 'svg',
          loop: false,
          autoplay: false,
          path: vars.path,
          rendererSettings: vars.rendererSettings || {
            preserveAspectRatio: 'xMidYMid slice',
          },
        });
      for (let p in vars) {
        // let users override the ScrollTrigger defaults
        st[p] = vars[p];
      }
      animation.addEventListener('DOMLoaded', function () {
        let createTween = function () {
          animation.frameTween = gsap.to(playhead, {
            frame: animation.totalFrames - 1,
            ease: 'none',
            onUpdate: () => animation.goToAndStop(playhead.frame, true),
            scrollTrigger: st,
          });
          return () => animation.destroy && animation.destroy();
        };
        ctx && ctx.add ? ctx.add(createTween) : createTween();
        // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
      return animation;
    }
    //lottie scrolltrigger timeline
    LottieScrollTrigger({
      trigger: lottieEl,
      target: lottieEl,
      path: lottiePath,
      speed: 'fast',
      scrub: 1, // seconds it takes for the playhead to "catch up"
    });
  };
  //Control Functions on page load
  homeScroll();
});
