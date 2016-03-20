$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('header').addClass('sticky');
    console.log('what');
  } else {
    $('header').removeClass('sticky');
  }
});
