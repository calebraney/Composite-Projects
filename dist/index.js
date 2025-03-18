(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const wrappers = Array.from(document.querySelectorAll('[data-lightbox="wrap"]'));
    const ACTIVE_CLASS = "is-active";
    wrappers.forEach((wrap) => {
      const trigger = wrap.querySelector('[data-lightbox="trigger"]');
      const lightbox = wrap.querySelector('[data-lightbox="lightbox"]');
      const videoContainer = wrap.querySelector('[data-lightbox="video"]');
      const closeBtn = wrap.querySelector('[data-lightbox="close"]');
      const videoSource = videoContainer.getAttribute("data-lightbox-source");
      if (!lightbox || !videoSource) return;
      let iframe;
      trigger.addEventListener("click", () => {
        lightbox.classList.add(ACTIVE_CLASS);
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${videoSource}?autoplay=1&enablejsapi=1`;
          iframe.setAttribute("allow", "autoplay; encrypted-media");
          iframe.setAttribute("allowfullscreen", "");
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          videoContainer.appendChild(iframe);
        }
      });
      closeBtn.addEventListener("click", () => {
        lightbox.classList.remove(ACTIVE_CLASS);
        if (iframe) {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
        }
      });
    });
  });
})();
