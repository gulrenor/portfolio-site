jQuery(function() {
  var form = $('#contact-form');
  var formMessages = $('#form-messages');

  $(form).on("submit", (function(event) {
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
  }));
});
