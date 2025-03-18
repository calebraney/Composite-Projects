// Sourcegraph homepage modal
// v1.0
document.addEventListener('DOMContentLoaded', function () {
  // Select all elements with [data-lightbox="wrap"]
  const wrappers = Array.from(document.querySelectorAll('[data-lightbox="wrap"]'));
  const ACTIVE_CLASS = 'is-active';

  // Loop through each wrapper
  wrappers.forEach((wrap) => {
    //elements
    const trigger = wrap.querySelector('[data-lightbox="trigger"]');
    const lightbox = wrap.querySelector('[data-lightbox="lightbox"]');
    const videoContainer = wrap.querySelector('[data-lightbox="video"]');
    const closeBtn = wrap.querySelector('[data-lightbox="close"]');
    const videoSource = videoContainer.getAttribute('data-lightbox-source');
    //return if trigger or video source isn't found
    if (!lightbox || !videoSource) return;

    let iframe; // To store the YouTube iframe reference

    // Handle trigger click
    trigger.addEventListener('click', () => {
      //show lightbox
      lightbox.classList.add(ACTIVE_CLASS);
      //if iframe doesn't exist, create one
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoSource}?autoplay=1&enablejsapi=1`;
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        videoContainer.appendChild(iframe);
      }
    });

    // Handle close click
    closeBtn.addEventListener('click', () => {
      //hide lightbox
      lightbox.classList.remove(ACTIVE_CLASS);
      if (iframe) {
        // Use postMessage to pause the video
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  });
});
