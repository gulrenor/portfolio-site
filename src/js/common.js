// Current year used for copyright
$(document).ready(function() {
	var thisYear = new Date().getFullYear();
	console.log(thisYear);
	$('#copyright-year').html(thisYear);	
});
