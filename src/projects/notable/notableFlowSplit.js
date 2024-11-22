// Notable Flowbuilder Scroll Lottie Triggers
//v1.0
document.addEventListener('DOMContentLoaded', function () {
  //////////////////////////////
  //lottie scrolltrigger function from gsap
  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' },
      st = {
        trigger: target,
        pin: false,
        start: 'top 45%',
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
  const setupLotties = function () {
    //selectors
    const SECTION = '.section';
    const LOTTIE_WRAP = '.flow-split_image-wrap';
    const LOTTIE_EL = '.flow-split_image';
    const SCROLL_TRIGGER = '.flow-split_content';
    //options
    const ACTIVE_CLASS = 'is-active';
    //elements
    const sections = [...document.querySelectorAll(SECTION)];
    sections.forEach((section, index) => {
      //elements
      const scrollTriggers = [...section.querySelectorAll(SCROLL_TRIGGER)];
      const items = [...section.querySelectorAll(LOTTIE_WRAP)];
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      //add active class to first item
      // firstItem.classList.add(ACTIVE_CLASS);

      //for each trigger
      items.forEach((item, index) => {
        //get the trigger el
        const scrollTrigger = scrollTriggers[index];
        const lottieOld = item.querySelector(LOTTIE_EL);
        let lottieNew, animation;
        if (!item || !scrollTrigger) return;
        const lottiePath = lottieOld.dataset.src;

        //vars used in scrolltriggers
        const vars = {
          trigger: scrollTrigger,
          start: 'top center',
          end: 'bottom center',
          markers: false,
          scrub: 1, // seconds it takes for the playhead to "catch up"
        };

        //check if element is lottie and return if not
        const animationType = lottieOld.dataset.animationType;
        let lottieAnimation = true;
        if (animationType !== 'lottie') {
          lottieAnimation = false;
        }
        //get lottie source file

        //get the path of the element
        if (lottieAnimation) {
          //remove original lottie element
          lottieOld.remove();
          //create a new lottie element and append it to the parent
          lottieNew = document.createElement('div');
          item.appendChild(lottieNew);
          lottieNew.classList.add(LOTTIE_EL);
          //create the animation
          // animation = lottie.loadAnimation({
          //   container: lottieNew, // the dom element that will contain the animation
          //   renderer: 'svg',
          //   loop: true,
          //   autoplay: true,
          //   path: lottiePath, // the path to the animation json
          // });

          //alternatively create a scrolling animation
          animation = LottieScrollTrigger({
            trigger: vars.trigger,
            target: lottieNew,
            path: lottiePath,
            start: vars.start,
            end: vars.end,
            markers: vars.markers,
            scrub: vars.scrub,
          });
        }

        const activateItem = function (activate = true) {
          if (activate) {
            item.classList.add(ACTIVE_CLASS);
            if (lottieAnimation) {
              animation.play();
              console.log('play', index);
            }
          } else {
            item.classList.remove(ACTIVE_CLASS);
          }
        };

        //show and hide each item on scroll
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
              // console.log('enter back', index);
              activateItem();
            },
            onLeaveBack: () => {
              if (item !== firstItem) {
                activateItem(false);
              }
              // console.log('leave back', index);
            },
          },
        });
      });
    });
  };

  //Control Functions on page load
  let mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    // the code will only run if the media query matches
    setupLotties();
    return () => {
      //this code will run when the media query stops matching
    };
  });
});
