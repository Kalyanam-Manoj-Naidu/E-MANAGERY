$(function() {
	// Add statusbar for standalone version
	if (window.navigator.standalone) {
		$("header").addClass("webapp");
		$("main").addClass("webapp");
		// Redirect hrefs to internal links
		$("a[target!='_blank']:not([href*=#])").on("click", function(e) {
			// Stop the default behavior of the browser, which is to change the URL of the page.
			e.preventDefault();
			// Manually change the location of the page to stay in "Standalone" mode.
			location.href = $(e.target).attr("href");
		});
	}
	// Setup menu animation
	var recalculate = function() {
		var smallScreen = window.matchMedia("only screen and (max-width: 480px)").matches,
			$toggle = $("#menu-toggle");
		if (smallScreen) {
			if ($toggle.length) {
				return;
			}
			var $menu = $("#menu"),
				$main = $("main");
			$toggle = $("<i class=\"fa fa-chevron-circle-down\" id=\"menu-toggle\" ontouchstart=\"\"></i>")
				.insertAfter($("#title"));
			$toggle.click(function () {
				$main.toggleClass("blur");
				$toggle.toggleClass("active");
				$menu.toggleClass("active");
			});
			$main.on("touchstart", function (e) {
				if ($(this).hasClass("blur")) {
					e.stopPropagation();
					$main.removeClass("blur");
					$toggle.removeClass("active");
					$menu.removeClass("active");
				}
			});
			$("header").on("touchmove", function (e) {
				if ($menu.hasClass("active")) {
					e.preventDefault();
				}
			});
		} else {
			$toggle.remove();
		}
	};
	$(window).resize(recalculate);
	recalculate();
});