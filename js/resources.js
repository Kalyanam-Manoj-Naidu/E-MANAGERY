$(function() {
	var $footer = $("footer");
	$footer.find(".left").click(function() {
		window.location.href = "solution.html";
	});
	$footer.find(".right").click(function() {
		window.location.href = "../"
	});
});