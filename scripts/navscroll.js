$(document).ready(function() {
  // Add smooth scrolling to all links
  $("header a").on('click', function(event) {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function() {

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });
});

$(window).scroll(function() {
  if ($(document).scrollTop() > 30) {
    $('header').addClass('sticky');
    //$('header').animate({height:'5rem'}, 1000);
  } else {
    $('header').removeClass('sticky');
  }
});
