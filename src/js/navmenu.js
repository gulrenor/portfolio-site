jQuery(function() {

  function checkBreakpoint() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return true;
    } else {
      return false;
    }
  };

  $(window).on("resize", (function() {
    if (!checkBreakpoint()) {
      $('nav').show(300);
    }
  }));

  $('.hamburger').on("click", (function() {
    if (checkBreakpoint()) {
      $('nav').toggle(300);
    }
  }));

  $('.nav-menu a').on("click", (function() {
    if (checkBreakpoint()) {
      $('nav').toggle(300);
    }
  }));

});
