$(function() {
	//var windowHeight = $.viewportH(),
	//	windowWidth = $.viewportW();
	var $header = $("header");
	$("a[href*=#]:not([href=#])").click(function() {
		if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
			if (target.length) {
				$("html, body").animate({
					scrollTop: target.offset().top - $header.outerHeight()
				}, 500);
				return false;
			}
		}
	});
	var $footer = $("footer");
	$footer.find(".left").click(function() {
		window.location.href = "about.html";
	});
	$footer.find(".right").click(function() {
		window.location.href = "resources.html"
	});
});