// Constants
const yearNow = new Date().getFullYear();

// Current year used for copyright
$(document).ready(function() {
  var thisYear = new Date().getFullYear();
  $('#copyright-year').html(thisYear);
});


// Form Handler
let form = document.getElementById('contact-form')
let formStatus = document.createElement('div')
formStatus.setAttribute('class', 'form-status alert')
form.appendChild(formStatus);

form.onsubmit = (e) => {
  e.preventDefault()

  // Gather form data into a FormData object
  let formdata = new FormData(form)

  let xhr = new XMLHttpRequest()
  xhr.open(form.method, form.action, true)
  xhr.send(formdata)

  // Callback
  xhr.onloadend = (response) => {
    if (response.target.status === 200) {
      formStatus.className += ' success'
      formStatus.innerHTML = response.target.responseText
    } else {
      formStatus.className += ' error'
      formStatus.innerHTML = "Something went wrong when submitting your form. Please try again."
    }
  }
}

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
