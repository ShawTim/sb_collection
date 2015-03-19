$.fn.loadCollection = function() {
	var index = window.location.href.indexOf("#");
	if (index >= 0) {
		var collectionStr = window.location.href.substring(index+1);
		var collections = collectionStr.split(",");
		$(collections).each(function(i, collection) {
			var row = collection >> 5;
			var col = collection & 31;
			for (var j=0; j<5; j++) {
				$("div:nth-of-type(" + (row+1) + ") > button:nth-of-type(" + (j+1) + ")", this).toggleClass("selected", !!(col&(1<<j)));
			}
		});
	}
};

$.fn.saveCollection = function() {
	var collection = "";
	var selected = 0;
	$("button", this).each(function(i, button) {
		var cur = $(button).hasClass("selected") ? 1 : 0;
		selected |= cur << (i%5);
		if (i % 5 == 4) {
			if (selected) {
				selected |= (i/5) << 5;
				collection += selected + ",";
			}
			selected = 0;
		}
	});
	window.location.href = "#" + collection.substring(0, collection.length-1);
};

$.fn.SBCollection = function() {

	var container = this;

	$("<img>", { src: "./SB_collection_selected.png" }).load(function(e) {
		var w = e.target.naturalWidth / 5;
		var r = e.target.naturalHeight / w; 

		for (var i=0; i<r; i++) {
			var row = $("<div></div>");
			for (var j=0; j<5; j++) {
				$("<button></button>", {
					css: {
						width: w,
						height: w,
						"background-position":  (j*-w) + "px " + (i*-w) + "px"
					},
					click: function() {
						$(this).toggleClass("selected");
						container.saveCollection();
					}
				}).appendTo(row);
			}
			container.append(row);
		}
		container.loadCollection();
	});
};
