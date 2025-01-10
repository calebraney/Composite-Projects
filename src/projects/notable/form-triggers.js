const triggerForms = function () {
  const forms = [...document.querySelectorAll('[data-form]')];
  forms.forEach(function (form) {
    //get close triggers
    const closeTriggers = [...form.querySelectorAll('[data-form-close]')];
    const formNumber = form.getAttribute('data-form');
    const triggers = [...document.querySelectorAll(`[data-form-trigger="${formNumber}"]`)];
    const tl = gsap.timeline({
      paused: true,
    });
    tl.set(form, {
      display: 'none',
    });
    tl.set(form, {
      display: 'flex',
    });
    tl.fromTo(
      form,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.6,
      }
    );
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', () => {
        tl.play();
      });
    });
    closeTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', () => {
        tl.reverse();
      });
    });
  });
};

triggerForms();
