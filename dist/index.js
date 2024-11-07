(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    const dynamicForm = function() {
      const FORM_BLOCK = "data-form-block";
      const FORM_SUCCESS = "data-form-success";
      const FORM_BUTTON = "data-form-button";
      const DOWNLOAD_BUTTON = "data-download-button";
      const HIDDEN_FIELD = "data-form-hidden-input";
      const SUBMIT_COOKIE = "form-submitted";
      const form = document.querySelector(FORM_BLOCK);
      const successMessage = document.querySelector(FORM_SUCCESS);
      const hiddenInput = document.querySelector(HIDDEN_FIELD);
      const formButtons = [...document.querySelectorAll(FORM_BUTTON)];
      const downloadButtons = [...document.querySelectorAll(DOWNLOAD_BUTTON)];
      if (!form || formButtons.length === 0) return;
      let redirectUrl;
      if (localStorage.getItem(SUBMIT_COOKIE) !== null) {
        formButtons.forEach((formButton, index) => {
          formButton.style.display = "none";
        });
        downloadButtons.forEach((downloadButton, index) => {
          downloadButton.style.display = "block";
        });
      }
      formButtons.forEach((formButton, index) => {
        formButton.addEventListener("click", () => {
          redirectUrl = formButton.getAttribute(FORM_BUTTON);
          hiddenInput.value = redirectUrl;
        });
      });
      let observer = new MutationObserver(function() {
        if (successMessage.style.display == "block") {
          localStorage.setItem(SUBMIT_COOKIE, "true");
          window.location.href = redirectUrl;
        }
      });
      observer.observe(successMessage, { attributes: true, childList: true });
    };
    dynamicForm();
  });
})();
