// Current year used for copyright
$(document).ready(function() {
  var thisYear = new Date().getFullYear();
  $('#copyright-year').html(thisYear);
});

$(function() {
  var form = $('#contact-form');
  var formMessages = $('#form-messages');

  $(form).submit(function(event) {
    event.preventDefault(); //stop html from submitting form

    // Check recaptcha was checked
    try {
      if (grecaptcha.getResponse() == '') {
        throw new Error('Please prove you\'re not a bot.');
      } else {
        var formData = $(form).serialize();

        // submit form
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'), //uses the default action from html
            data: formData
          })
          // display success
          .done(function(response) {
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');
            $('#contact-name').prop('readonly', 'readonly');
            $('#contact-email').prop('readonly', 'readonly');
            $('#contact-comment').prop('readonly', 'readonly');
            $('#contact-submit').prop('disabled', 'disabled');
            $('#contact-submit').html(response);
          })

          //display error
          .fail(function(data) {
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');
            if (data.responseText !== '') {
              $(formMessages).text(data.responseText);
            } else {
              $(formMessages).text('An error occured.');
            }
          });
      };
    }
    catch(err) {
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');
      $(formMessages).text('Please prove you\'re not a robot.');
    }
  });
});

var dateNow = new Date();
var yearNow = dateNow.getFullYear();

$(".gallery-item").click(
  function() {
    $(this).next().show();
  }
);

$(".gallery-item-close").click(
  function() {
    //$(this).parent().hide();
    $(this).closest('article').hide();
  }
);

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-43244440-1', 'auto');
  ga('send', 'pageview');

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
