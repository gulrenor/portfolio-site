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
