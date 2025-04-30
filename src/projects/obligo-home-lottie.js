//v1.1 homepage lottie animation for obligo tabs rotation
document.addEventListener('DOMContentLoaded', function () {
  const homeLottieTabs = function () {
    console.log('hi');
    const TAB_LINK = '.process-tabs_tab-link';
    const TAB_LINK_INNER = '.tab-lottie-wrapper';
    const TAB_PANEL = '.process-tabs_tab-pane';
    const MAIN_LOTTIE_CLASS = 'process-tabs_image';
    const NUMBER_CLASS = 'number';
    // panels may be Webflow's default .w-tab-pane elements:
    const tabLinks = Array.from(document.querySelectorAll(TAB_LINK));
    const tabLinksInner = Array.from(document.querySelectorAll(TAB_LINK_INNER));
    const panels = Array.from(document.querySelectorAll(TAB_PANEL));
    if (!tabLinksInner.length || !panels.length) return;
    // --- 1) initialize two sets of animations per panel ---
    const mainAnims = []; // the ones that control autoplay
    const nestedAnims = []; // the extra “number” lotties

    //setup each lottie
    panels.forEach((panel, index) => {
      //get lottie source then create a new element nad hide the webflow lottie.
      const mainLottieEl = panel.querySelector(`.${MAIN_LOTTIE_CLASS}`);
      const mainLottieSrc = mainLottieEl.dataset.src;
      const mainParent = mainLottieEl.parentElement;
      mainLottieEl.style.display = 'none';
      const mainLottieWrap = document.createElement('div');
      mainLottieWrap.classList.add(MAIN_LOTTIE_CLASS);
      mainParent.prepend(mainLottieWrap);

      // a) main Lottie in this panel (no .number class)
      if (mainLottieWrap) {
        const mainAnim = lottie.loadAnimation({
          container: mainLottieWrap,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: mainLottieSrc,
        });
        // console.log(mainLottieWrap, `main lottie ${index}`);
        mainAnim.goToAndStop(0, true);
        mainAnims.push(mainAnim);
      }

      //get lottie source then create a new element nad hide the webflow lottie.
      //for number element
      const tabLink = tabLinksInner[index];
      const numberLottieEl = tabLink.querySelector(`.${MAIN_LOTTIE_CLASS}.${NUMBER_CLASS}`);
      const numberLottieSrc = numberLottieEl.dataset.src;
      const numberParent = numberLottieEl.parentElement;
      numberLottieEl.style.display = 'none';
      const numberLottieWrap = document.createElement('div');
      numberLottieWrap.classList.add(MAIN_LOTTIE_CLASS);
      numberLottieWrap.classList.add(NUMBER_CLASS);
      numberParent.prepend(numberLottieWrap);
      // b) any nested Lotties with the combo class “number”
      if (numberLottieWrap) {
        // console.log(numberLottieWrap, `number lottie ${index}`);
        const numberAnim = lottie.loadAnimation({
          container: numberLottieWrap,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: numberLottieSrc,
        });
        numberAnim.goToAndStop(0, true);
        nestedAnims.push(numberAnim);
      }
    });
    //keep track of the current index
    let currentIndex = -1;
    // --- 2) advance tabs only when the MAIN Lottie completes ---
    mainAnims.forEach((anim, i) => {
      anim.addEventListener('complete', () => {
        if (i === currentIndex) {
          nextTab();
        }
      });
    });
    // --- 3) wire manual clicks to keep index in sync & fire both Lotties ---
    tabLinks.forEach((link, i) => {
      link.addEventListener('click', () => {
        currentIndex = i - 1;
        // play both sets when user clicks
        stopAnimations(true);
        nextTab();
      });
    });
    function nextTab() {
      // cycle & click
      currentIndex = (currentIndex + 1) % tabLinksInner.length;
      //make all numbers go to 0 at beginning of loop
      if (currentIndex === 0) {
        stopAnimations();
      }
      tabLinksInner[currentIndex].click();
      //  a) play the main one (triggers nextTab on its complete)
      mainAnims[currentIndex].goToAndPlay(0, true);
      //  b) also play every nested one in this panel
      nestedAnims[currentIndex].goToAndPlay(0, true);
    }
    function stopAnimations(nested = false) {
      if (nested) {
        nestedAnims.forEach((anim) => {
          anim.goToAndStop(0, true);
        });
      }
      mainAnims.forEach((anim) => {
        anim.goToAndStop(0, true);
      });
    }
    // --- 4) kick it all off ---
    nextTab();
  };

  let mm = gsap.matchMedia();
  mm.add(
    {
      //This is the conditions object
      isMobile: '(max-width: 767px)',
      isTablet: '(min-width: 768px)  and (max-width: 991px)',
      isDesktop: '(min-width: 992px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (gsapContext) => {
      let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;

      //globaally run animations on specific breakpoints
      if (isDesktop) {
        //   bundlesSlider();
        homeLottieTabs();
      }
    }
  );
});
