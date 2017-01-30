$(document).ready(function() {

  function checkBreakpoint() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return true;
    } else {
      return false;
    }
  };

  $(window).resize(function() {
    console.log(checkBreakpoint());
    if (!checkBreakpoint()) {
      $('nav').show(300);
    }
  })

  $('.hamburger').click(function() {
    if (checkBreakpoint()) {
      console.log('clicked small');
      $('nav').toggle(300);
    }
  });

  $('.nav-menu a').click(function() {
    if (checkBreakpoint()) {
      console.log('clicked nav menu when small');
      $('nav').toggle(300);
    }
  });

});

/*
$(window).resize(
    function() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            console.log('small');
            $('.nav-menu a').click(function() {
                console.log('menu clicked when small');
                $('nav').toggle(300);
            });
        } else {
            console.log('not small')
            $('nav').show(300);
        };
    }
);
*/
