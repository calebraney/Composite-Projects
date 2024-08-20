(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    if (gsap.ScrollTrigger !== void 0) {
      gsap.registerPlugin(ScrollTrigger);
    }
    const SECTION_CLASS = ".home_hero-scroll";
    const CONTENT_CLASS = ".home-hero_sticky";
    const BG_CLASS = ".home_hero-bottom";
    const LOTTIE_EL = ".home_lottie";
    const section = document.querySelector(SECTION_CLASS);
    const lottieEl = document.querySelector(LOTTIE_EL);
    const content = document.querySelector(CONTENT_CLASS);
    const bottom = document.querySelector(BG_CLASS);
    const lottiePath = lottieEl.dataset.src;
    const homeScroll = function() {
      if (!section || !content || !lottieEl) return;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          ease: "none",
          markers: false,
          scrub: true
        },
        defaults: {
          duration: 1,
          ease: "none"
        }
      });
      tl.fromTo(
        content,
        {
          yPercent: 0
        },
        {
          yPercent: 50
        }
      );
    };
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
    let mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      homeScroll();
      LottieScrollTrigger({
        trigger: lottieEl,
        target: lottieEl,
        path: lottiePath,
        speed: "fast",
        scrub: 1
        // seconds it takes for the playhead to "catch up"
      });
      return () => {
      };
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    $(".slider-main_component.products").each(function(index) {
      let loopMode = false;
      if ($(this).attr("loop-mode") === "true") {
        loopMode = true;
      }
      let sliderDuration = 300;
      if ($(this).attr("slider-duration") !== void 0) {
        sliderDuration = +$(this).attr("slider-duration");
      }
      const swiper = new Swiper($(this).find(".swiper")[0], {
        speed: sliderDuration,
        loop: loopMode,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: "6",
        spaceBetween: "1%",
        rewind: false,
        mousewheel: {
          forceToAxis: true
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        breakpoints: {
          // mobile landscape
          480: {
            slidesPerView: "1",
            spaceBetween: "4%"
          },
          // tablet
          768: {
            slidesPerView: "3",
            spaceBetween: "4%"
          },
          // desktop
          992: {
            slidesPerView: "6",
            spaceBetween: "1%"
          }
        },
        pagination: {
          el: $(this).find(".swiper-bullet-wrapper")[0],
          bulletActiveClass: "is-active",
          bulletClass: "swiper-bullet",
          bulletElement: "button",
          clickable: true
        },
        navigation: {
          nextEl: $(this).find(".swiper-next")[0],
          prevEl: $(this).find(".swiper-prev")[0],
          disabledClass: "is-disabled"
        },
        scrollbar: {
          el: $(this).find(".swiper-drag-wrapper")[0],
          draggable: true,
          dragClass: "swiper-drag",
          snapOnRelease: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
      });
    });
  });
})();
