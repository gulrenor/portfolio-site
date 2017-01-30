// Current year used for copyright
$(document).ready(function() {
	var thisYear = new Date().getFullYear();
	console.log(thisYear);
	$('#copyright-year').html(thisYear);	
});

$(function() {
  var form = $('#contact-form');
  var formMessages = $('#form-messages');

  $(form).submit(function(event) {
    event.preventDefault(); //stop html from submitting form

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
        $(formMessages).text(response);
        $(form).hide(800);
        $('#contact-name').val('');
        $('#contact-email').val('');
        $('#contact-comment').val('');
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
  });
});

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
    console.log(checkBreakpoint());
    if (!checkBreakpoint()) {
      $('nav').show(300);
    }
  })

  $('#hamburger').click(function() {
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
