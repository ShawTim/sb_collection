var loadCollection = function() {
	var index = window.location.href.indexOf("#");
	if (index >= 0) {
		var collectionStr = window.location.href.substring(index+1);
		var collections = collectionStr.split(",");
		$(collections).each(function(i, collection) {
			var row = collection >> 5;
			var col = collection & 31;
			for (var j=0; j<5; j++) {
				$("div:nth-of-type(" + (row+1) + ") > button:nth-of-type(" + (j+1) + ")").toggleClass("selected", !!(col&(1<<j)));
			}
		});
	}
};

var saveCollection = function() {
	var collection = "";
	var selected = 0;
	$("button").each(function(i, button) {
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

$(document).ready(function() {
	var img = $("<img>");
	img.attr("src", "./SB_collection_selected.png");
	var w = img[0].naturalWidth / 5;
	var r = img[0].naturalHeight / w; 

	var container = $(".container");
	for (var i=0; i<r; i++) {
		var row = $("<div></div>");
		for (var j=0; j<5; j++) {
			var button = $("<button></button>");
			button.css("width", w);
			button.css("height", w);
			button.css("background-position", (j*-102) + "px " + (i*-102) + "px");
			row.append(button);
		}
		container.append(row);
	}
	$("button").click(function() {
		$(this).toggleClass("selected");
		saveCollection();
	});
	loadCollection();
});
