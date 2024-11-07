// v1.0 flowbuilder Form Interaction
document.addEventListener('DOMContentLoaded', function () {
  //////////////////////////////
  const dynamicForm = function () {
    //selecctors
    const FORM_BLOCK = 'data-form-block';
    const FORM_SUCCESS = 'data-form-success';
    const FORM_BUTTON = 'data-form-button'; // value of this attribute should be the target url on form submission
    const DOWNLOAD_BUTTON = 'data-download-button';
    const HIDDEN_FIELD = 'data-form-hidden-input';
    const SUBMIT_COOKIE = 'form-submitted';
    //elements
    const form = document.querySelector(FORM_BLOCK);
    const successMessage = document.querySelector(FORM_SUCCESS);
    const hiddenInput = document.querySelector(HIDDEN_FIELD);

    const formButtons = [...document.querySelectorAll(FORM_BUTTON)];
    const downloadButtons = [...document.querySelectorAll(DOWNLOAD_BUTTON)];
    if (!form || formButtons.length === 0) return;
    let redirectUrl;

    //on load check for cookie and if set change the buttons visibility
    if (localStorage.getItem(SUBMIT_COOKIE) !== null) {
      // hide form buttons
      formButtons.forEach((formButton, index) => {
        formButton.style.display = 'none';
      });
      downloadButtons.forEach((downloadButton, index) => {
        downloadButton.style.display = 'block';
      });
    }

    //update form and redirect on button clicks
    formButtons.forEach((formButton, index) => {
      //when button is clicked updated hidden form field and redirect url
      formButton.addEventListener('click', () => {
        redirectUrl = formButton.getAttribute(FORM_BUTTON);
        hiddenInput.value = redirectUrl;
      });
    });

    //listenever for form submission
    let observer = new MutationObserver(function () {
      // when form is submitted
      if (successMessage.style.display == 'block') {
        //create cookie to show download buttons
        localStorage.setItem(SUBMIT_COOKIE, 'true');

        //redirect user
        window.location.href = redirectUrl;
      }
    });
    observer.observe(successMessage, { attributes: true, childList: true });
  };
  dynamicForm();
});
