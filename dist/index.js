(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const lightLogo = document.querySelector(".logo-primary-img.is-light-gradient");
    const darkLogo = document.querySelector(".logo-primary-img.is-dark-gradient");
    const navbar = document.querySelector("nav");
    const navBg = document.querySelector(".nav_bg");
    const linkText = document.querySelectorAll(".nav_link-text");
    const linkLines = document.querySelectorAll(".nav_link-underline");
    const navUnderline = document.querySelector(".nav_underline");
    console.log("hi");
    const tl = gsap.timeline({
      paused: true,
      delay: 0.4,
      defaults: {
        ease: "power1.out",
        duration: 0.3
      }
    });
    tl.to(
      {},
      {
        duration: 0.6
      }
    );
    tl.fromTo(
      linkText,
      {
        color: "white"
      },
      {
        color: "inherit"
      }
    );
    tl.fromTo(
      [linkLines, navUnderline, navBg],
      {
        opacity: 0
      },
      {
        opacity: 1
      },
      "<"
    );
    tl.progress(0);
    function darkNav() {
      lightLogo.style.display = "none";
      darkLogo.style.display = "block";
    }
    function lightNav() {
      lightLogo.style.display = "block";
      darkLogo.style.display = "none";
    }
    function scrollDirectionListener() {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      console.log(currentScroll);
      if (currentScroll === 0) {
        darkNav();
        tl.reverse();
      } else {
        lightNav();
        tl.play();
      }
    }
    scrollDirectionListener();
    window.addEventListener("scroll", scrollDirectionListener);
  });
  $(document).ready(function() {
    $(".slider-main_component.is-testimonial").each(function() {
      let loopMode = $(this).data("loop-mode") === true;
      let sliderDuration = $(this).data("slider-duration") || 300;
      new Swiper($(this).find(".swiper.is-testimonial")[0], {
        speed: sliderDuration,
        loop: true,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: "auto",
        spaceBetween: "3%",
        rewind: false,
        mousewheel: {
          forceToAxis: true
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true
        },
        breakpoints: {
          480: {
            slidesPerView: "1",
            spaceBetween: "2%"
          },
          768: {
            slidesPerView: "1",
            spaceBetween: "2%"
          },
          992: {
            slidesPerView: "1",
            spaceBetween: "2%"
          }
        },
        navigation: {
          nextEl: $(this).find(".swiper-next")[0],
          prevEl: $(this).find(".swiper-prev")[0],
          disabledClass: "is-disabled"
        },
        pagination: {
          el: $(this).find(".swiper-bullet-wrapper")[0],
          bulletActiveClass: "is-active",
          bulletClass: "swiper-bullet",
          bulletElement: "button",
          clickable: true
        },
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active"
      });
    });
  });
})();
