//homepage lottie animation for obligo tabs rotation
document.addEventListener('DOMContentLoaded', function () {
  // panels may be Webflow's default .w-tab-pane elements:
  const tabLinks = Array.from(document.querySelectorAll('.tab-lottie-wrapper'));
  const panels = Array.from(document.querySelectorAll('.process-tabs_tab-pane'));
  if (!tabLinks.length || !panels.length) return;
  // --- 1) initialize two sets of animations per panel ---
  const mainAnims = []; // the ones that control autoplay
  const nestedAnims = []; // the extra “number” lotties

  panels.forEach((panel, index) => {
    const mainLottieEl = panel.querySelector('.process-tabs_image');
    const mainLottieSrc = mainLottieEl.dataset.src;
    const mainParent = mainLottieEl.parentElement;
    mainLottieEl.style.display = 'none';
    const mainLottieWrap = document.createElement('div');
    mainLottieWrap.classList.add('process-tabs_image');
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

    //for number element
    const tabLink = tabLinks[index];
    const numberLottieEl = tabLink.querySelector('.process-tabs_image.number');
    const numberLottieSrc = numberLottieEl.dataset.src;
    const numberParent = numberLottieEl.parentElement;
    numberLottieEl.style.display = 'none';
    const numberLottieWrap = document.createElement('div');
    numberLottieWrap.classList.add('process-tabs_image');
    numberLottieWrap.classList.add('number');
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
      currentIndex = i;
      // play both sets when user clicks
      mainAnims[i].goToAndPlay(0, true);
      nestedAnims[i].goToAndPlay(0, true);
    });
  });
  function nextTab() {
    // cycle & click
    currentIndex = (currentIndex + 1) % tabLinks.length;
    //make all numbers go to 0 at beginning of loop
    if (currentIndex === 0) {
      nestedAnims.forEach((anim) => {
        anim.goToAndStop(0, true);
      });
    }
    tabLinks[currentIndex].click();
    //  a) play the main one (triggers nextTab on its complete)
    mainAnims[currentIndex].goToAndPlay(0, true);
    //  b) also play every nested one in this panel
    nestedAnims[currentIndex].goToAndPlay(0, true);
  }
  // --- 4) kick it all off ---
  nextTab();
});
