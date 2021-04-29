$(function() {
	var windowHeight = $.viewportH(),
		windowWidth = $.viewportW(),
		controller = new ScrollMagic.Controller();

	// Parallax phone
	var $phone = $("#cellphone");
	var recalculate = function(removeClass) {
		$phone.css("left", -$phone.width() + "px");
		if (removeClass) {
			$phone.width(); // trigger
			$phone.removeClass("no-transition");
		}
		$phone.css("left", -$phone.width() / 3 + "px");
		$(".phone-padding").css({
			marginLeft: $phone.width() * 2/3 + "px",
			maxWidth: windowWidth - $phone.width() * 2/3 + "px"
		});
	};
	$phone.on("load", function() {
		$phone.addClass("no-transition");
		recalculate(true);
	});
	var parallax = new TimelineLite()
		.fromTo($phone, 1, {top: "0"}, {top: "-100%", ease: Linear.easeNone});
	new ScrollMagic.Scene({
		triggerElement: "#case",
		triggerHook: "onCenter",
		duration: $(document).height()
	}).setTween(parallax)
		.setPin("#case")
		.addTo(controller);

	$(window).resize(function() {
		if ($phone[0].complete) {
			recalculate(false);
		}
	});

	var $main = $("main"),
		timer, notif;
	$(".hex").click(function(e) {
		var obj = $(e.target),
			chem = obj.attr("data-chem");
		if (chem === undefined) {
			if (!window.open("http://ewasteguide.info/hazardous-substances", "_blank")) {
				window.open("http://ewasteguide.info/hazardous-substances", "_self");
			}
		} else {
			if (notif !== undefined) {
				clearTimeout(timer);
				if (notif.text() === chem) {
					timer = setTimeout(function() {
						notif.removeClass("active");
						var temp = notif;
						notif = undefined;
						setTimeout(function() {
							temp.remove();
						}, 300);
					}, 1000);
				} else {
					notif.removeClass("active");
					var temp = notif;
					notif = $("<div id=\"notification\">" +
						"<h1>" + chem + "</h1>" +
						"</div>");
					notif.find("h1").click(function() {
						clearTimeout(timer);
						notif.removeClass("active");
						var temp = notif;
						notif = undefined;
						setTimeout(function() {
							temp.remove();
						}, 300);
					});
					timer = setTimeout(function () {
						temp.remove();
						notif.insertAfter($main);
						notif.width();
						notif.addClass("active");
						timer = setTimeout(function () {
							notif.removeClass("active");
							var temp = notif;
							notif = undefined;
							setTimeout(function () {
								temp.remove();
							}, 300);
						}, 1000);
					}, 300);
				}
			} else {
				notif = $("<div id=\"notification\">" +
					"<h1>" + chem + "</h1>" +
					"</div>").insertAfter($main);
				notif.find("h1").click(function() {
					clearTimeout(timer);
					notif.removeClass("active");
					var temp = notif;
					notif = undefined;
					setTimeout(function() {
						temp.remove();
					}, 300);
				});
				notif.width();
				notif.addClass("active");
				timer = setTimeout(function () {
					notif.removeClass("active");
					var temp = notif;
					notif = undefined;
					setTimeout(function() {
						temp.remove();
					}, 300);
				}, 1000);
			}
		}
	});

	var $footer = $("footer");
	$footer.find(".left").click(function() {
		window.location.href = "./";
	});
	$footer.find(".right").click(function() {
		window.location.href = "solution.html"
	});
});