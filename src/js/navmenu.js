$(document).ready(function() {

  function checkBreakpoint() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return true;
    } else {
      return false;
    }
  };

  $(window).resize(function() {
    if (!checkBreakpoint()) {
      $('nav').show(300);
    }
  })

  $('.hamburger').click(function() {
    if (checkBreakpoint()) {
      $('nav').toggle(300);
    }
  });

  $('.nav-menu a').click(function() {
    if (checkBreakpoint()) {
      $('nav').toggle(300);
    }
  });

});
