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
