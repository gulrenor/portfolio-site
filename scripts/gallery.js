$(".gallery-item").click(
    function() {
        console.log('working');
       $(this).next().show();
    }
);

$(".gallery-item-close").click(
    function() {
        console.log('working');
       $(this).parent().hide();
    }
);
