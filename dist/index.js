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
    const attr = function(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    };
    const runSplit = function(text, types = "lines, words") {
      if (!text) return;
      typeSplit = new SplitType(text, {
        types
      });
      return typeSplit;
    };
    const load = function() {
      const ATTRIBUTE = "data-load";
      const HEADING = "heading";
      const ITEM = "item";
      const IMAGE = "image";
      const STAGGER = "stagger";
      const POSITION = "data-load-position";
      const DEFAULT_STAGGER = "<0.2";
      const items = gsap.utils.toArray(`[${ATTRIBUTE}]`);
      if (items.length === 0) return;
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power1.out",
          duration: 0.6
        }
      });
      const loadHeading = function(item) {
        const splitText = runSplit(item);
        if (!splitText) return;
        const position = attr("<", item.getAttribute(POSITION));
        tl.set(item, { opacity: 1 });
        tl.fromTo(
          splitText.words,
          { opacity: 0, y: "50%" },
          { opacity: 1, y: "0%", stagger: { each: 0.1, from: "left" } },
          position
        );
      };
      const loadImage = function(item) {
        const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
        tl.fromTo(item, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1 }, position);
      };
      const loadItem = function(item) {
        const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
        tl.fromTo(item, { opacity: 0, y: "2rem" }, { opacity: 1, y: "0rem" }, position);
      };
      const loadStagger = function(item) {
        if (!item) return;
        const children = gsap.utils.toArray(item.children);
        if (children.length === 0) return;
        children.forEach((child, index) => {
          if (index === 0) {
            item.style.opacity = 1;
          }
          loadItem(child);
        });
      };
      items.forEach((item) => {
        if (!item) return;
        const loadType = item.getAttribute(ATTRIBUTE);
        if (loadType === HEADING) {
          loadHeading(item);
        }
        if (loadType === IMAGE) {
          loadImage(item);
        }
        if (loadType === ITEM) {
          loadItem(item);
        }
        if (loadType === STAGGER) {
          loadStagger(item);
        }
      });
      tl.play(0);
      return tl;
    };
    const scrollIn = function() {
      const ATTRIBUTE = "data-scrollin";
      const HEADING = "heading";
      const SUBHEADING = "subheading";
      const PANEL = "panel";
      const ITEM = "item";
      const CONTAINER = "container";
      const STAGGER = "stagger";
      const RICH_TEXT = "rich-text";
      const IMAGE = "image";
      const LINE = "line";
      const SCROLL_START = "data-scrollin-start";
      const SCROLL_END = "data-scrollin-end";
      const SCROLL_STAGGER_X = "data-scrollin-stagger-x";
      const CLIP_DIRECTION = "data-scrollin-direction";
      const scrollInTL = function(item, options = {}) {
        const settings = {
          start: "top 90%",
          end: "top 60%"
        };
        if (options.scrub !== true) {
          settings.toggleActions = "play none none none";
        } else {
          settings.scrub = true;
        }
        settings.start = attr(settings.start, item.getAttribute(SCROLL_START));
        settings.end = attr(settings.end, item.getAttribute(SCROLL_END));
        const tl = gsap.timeline({
          defaults: {
            duration: 0.6,
            ease: "power1.out"
          },
          scrollTrigger: {
            trigger: item,
            start: settings.start,
            end: settings.end,
            toggleActions: settings.toggleActions,
            scrub: settings.scrub
          }
        });
        return tl;
      };
      const defaultTween = function(item, tl, options = {}) {
        const varsFrom = {
          opacity: 0,
          y: "2rem"
        };
        const varsTo = {
          opacity: 1,
          y: "0rem"
        };
        if (options.stagger === true) {
          varsTo.stagger = { each: 0.1, from: "start" };
        }
        const tween = tl.fromTo(item, varsFrom, varsTo);
        return tween;
      };
      const scrollInHeading = function(item) {
        const splitText = runSplit(item, "lines, words, chars");
        if (!splitText) return;
        const tl = scrollInTL(item);
        tl.fromTo(
          splitText.chars,
          {
            opacity: 0
          },
          {
            opacity: 1,
            ease: "power1.out",
            stagger: { amount: 0.4, from: "random" }
          }
        );
        tl.eventCallback("onComplete", () => {
        });
      };
      const scrollInSubHeading = function(item) {
        const splitText = runSplit(item);
        if (!splitText) return;
        const tl = scrollInTL(item, { scrub: true });
        tl.fromTo(
          splitText.words,
          {
            opacity: 0.2
          },
          {
            opacity: 1,
            ease: "power1.out",
            stagger: { each: 0.4 }
          }
        );
      };
      const scrollInItem = function(item) {
        if (!item) return;
        const tl = scrollInTL(item);
        const tween = defaultTween(item, tl);
      };
      const getCLipStart = function(item) {
        let defaultDirection = "top";
        let clipStart;
        const direction = attr(defaultDirection, item.getAttribute(CLIP_DIRECTION));
        const clipDirections = {
          left: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          right: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
          top: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          bottom: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        };
        if (direction === "left") {
          clipStart = clipDirections.left;
        }
        if (direction === "right") {
          clipStart = clipDirections.right;
        }
        if (direction === "top") {
          clipStart = clipDirections.top;
        }
        if (direction === "bottom") {
          clipStart = clipDirections.bottom;
        }
        return clipStart;
      };
      const scrollInImage = function(item) {
        if (!item) return;
        const tl = scrollInTL(item);
        tl.fromTo(
          item,
          {
            filter: "blur(32px)"
          },
          {
            filter: "blur(0px)",
            duration: 0.6
          }
        );
      };
      const scrollInPanel = function(item) {
        if (!item) return;
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "top 50%",
            markers: false,
            scrub: true
          },
          defaults: {
            duration: 1,
            ease: "none"
          }
        });
        tl.fromTo(
          item,
          {
            scale: 0.8,
            y: "4rem"
          },
          {
            scale: 1,
            y: "0rem"
          }
        );
      };
      const scrollInLine = function(item) {
        if (!item) return;
        const clipStart = getCLipStart(item);
        const clipEnd = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        const tl = scrollInTL(item);
        tl.fromTo(
          item,
          {
            clipPath: clipStart
          },
          {
            clipPath: clipEnd
          }
        );
      };
      const scrollInContainer = function(item) {
        if (!item) return;
        const children = gsap.utils.toArray(item.children);
        if (children.length === 0) return;
        children.forEach((child) => {
          const tl = scrollInTL(child);
          const tween = defaultTween(child, tl);
        });
      };
      const scrollInStagger = function(item) {
        if (!item) return;
        const children = gsap.utils.toArray(item.children);
        if (children.length === 0) return;
        const tl = scrollInTL(item);
        const tween = defaultTween(children, tl, { stagger: true });
      };
      const scrollInRichText = function(item) {
        if (!item) return;
        const children = gsap.utils.toArray(item.children);
        if (children.length === 0) return;
        children.forEach((child) => {
          const childTag = child.tagName;
          if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(childTag)) {
            scrollInHeading(child);
          }
          if (childTag === "FIGURE") {
            scrollInImage(child);
          } else {
            scrollInItem(child);
          }
        });
      };
      const items = gsap.utils.toArray(`[${ATTRIBUTE}]`);
      items.forEach((item) => {
        if (!item) return;
        const scrollInType = item.getAttribute(ATTRIBUTE);
        if (scrollInType === HEADING) {
          scrollInHeading(item);
        }
        if (scrollInType === SUBHEADING) {
          scrollInSubHeading(item);
        }
        if (scrollInType === PANEL) {
          scrollInPanel(item);
        }
        if (scrollInType === ITEM) {
          scrollInItem(item);
        }
        if (scrollInType === IMAGE) {
          scrollInImage(item);
        }
        if (scrollInType === LINE) {
          scrollInLine(item);
        }
        if (scrollInType === CONTAINER) {
          scrollInContainer(item);
        }
        if (scrollInType === STAGGER) {
          scrollInStagger(item);
        }
        if (scrollInType === RICH_TEXT) {
          scrollInRichText(item);
        }
      });
    };
    const homeUsesSlider = function() {
      const COMPONENT = ".home-uses_component";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const SCROLLBAR = ".swiper-scrollbar";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT).forEach(function(component) {
        if (!component) return;
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        const scrollbar = component.querySelector(SCROLLBAR);
        if (!component) return;
        const swiper = new Swiper(component, {
          // modules: [Navigation],
          breakpoints: {
            // mobile
            320: {
              slidesPerView: 1,
              spaceBetween: 16
            },
            // tablet
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            // desktop
            992: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          },
          speed: 600,
          loop: false,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS,
          navigation: {
            nextEl: nextButtonEl,
            prevEl: previousButtonEl,
            disabledClass: DISABLED_CLASS
          },
          scrollbar: {
            el: scrollbar,
            draggable: true
          },
          on: {
            slideChange: function() {
            }
          }
        });
      });
    };
    const testimonialsSlider = function() {
      const COMPONENT = ".testimonials_component";
      const SLIDER = ".swiper";
      const NEXT_BUTTON = ".swiper-next";
      const PREVIOUS_BUTTON = ".swiper-prev";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT);
      components.forEach(function(component) {
        if (!component) return;
        const nextButtonEl = component.querySelector(NEXT_BUTTON);
        const previousButtonEl = component.querySelector(PREVIOUS_BUTTON);
        const slider = component.querySelector(SLIDER);
        if (!slider) return;
        const swiper = new Swiper(slider, {
          speed: 800,
          slidesPerView: "auto",
          loop: true,
          centeredSlides: true,
          allowTouchMove: false,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS,
          navigation: {
            nextEl: nextButtonEl,
            prevEl: previousButtonEl,
            disabledClass: DISABLED_CLASS
          },
          on: {
            slideChange: function() {
            }
          }
        });
      });
    };
    const logosSlider = function() {
      const COMPONENT = ".logo-marquee_component";
      const SLIDER = ".swiper";
      const ACTIVE_CLASS = "is-active";
      const DISABLED_CLASS = "is-disabled";
      const components = gsap.utils.toArray(COMPONENT);
      components.forEach(function(component) {
        if (!component) return;
        const slider = component.querySelector(SLIDER);
        if (!slider) return;
        const swiper = new Swiper(slider, {
          speed: 800,
          breakpoints: {
            // mobile
            320: {
              slidesPerView: 1,
              spaceBetween: 24
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 24
            },
            // tablet
            768: {
              slidesPerView: 3,
              spaceBetween: 32
            },
            // desktop
            992: {
              slidesPerView: 4,
              spaceBetween: 48
            },
            1320: {
              slidesPerView: 5,
              spaceBetween: 48
            }
          },
          loop: true,
          autoplay: { delay: 1e3 },
          centeredSlides: true,
          allowTouchMove: true,
          slideActiveClass: ACTIVE_CLASS,
          slideDuplicateActiveClass: ACTIVE_CLASS
        });
      });
    };
    load();
    scrollIn();
    homeUsesSlider();
    testimonialsSlider();
    logosSlider();
  });
})();
