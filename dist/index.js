(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const tabsAutoplay = function() {
      const TAB_MENU = ".hero-tabs_menu";
      const TAB_LINK = ".hero-tabs_link";
      const TIMER_LINE = ".hero-tabs_line-fill";
      const ACTIVE_CLASS = "w--current";
      const TIMER_DURATION = 10;
      const components = [...document.querySelectorAll(TAB_MENU)];
      components.forEach((component) => {
        const tabs = [...component.querySelectorAll(TAB_LINK)];
        const timerLines = [...component.querySelectorAll(TIMER_LINE)];
        const timerDuration = TIMER_DURATION;
        if (tabs.length === 0) return;
        let timer;
        let userClick = true;
        let tl = gsap.timeline({});
        clearInterval(timer);
        const startTimer = function(tl2) {
          if (tl2) {
            tl2.kill();
            tl2 = gsap.timeline({});
          }
          let time = timerDuration - 1;
          tl2.fromTo(
            timerLines,
            {
              width: "0%"
            },
            {
              width: "100%",
              duration: time,
              ease: "none"
            }
          );
          timer = setInterval(function() {
            time--;
            if (time === 0) {
              changeTab();
            }
          }, 1e3);
        };
        const changeTab = function(nextIndex = void 0, manualClick = false) {
          if (manualClick === false) {
            userClick = false;
            if (nextIndex === void 0) {
              nextIndex = findNextIndex();
            }
            const nextTab = tabs[nextIndex];
            nextTab.click();
          }
          userClick = true;
          clearInterval(timer);
          startTimer(tl);
        };
        changeTab(0);
        const findNextIndex = function() {
          let currentIndex;
          tabs.forEach((tab, index) => {
            if (tab.classList.contains(ACTIVE_CLASS)) {
              currentIndex = index;
            }
          });
          if (currentIndex === tabs.length - 1) {
            return 0;
          } else {
            return currentIndex + 1;
          }
        };
        tabs.forEach((tab, index) => {
          tab.addEventListener("click", function() {
            if (userClick === true) {
              changeTab(index, true);
            }
          });
        });
      });
    };
    tabsAutoplay();
  });
})();
