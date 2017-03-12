App = {
	init: function() {
		this.loadBackgroundImages();
	},

	loadBackgroundImages: function() {
		var images = document.querySelectorAll('[data-image]');
		for (var i = images.length - 1; i >= 0; i--) {
			var div = images[i];
			var imageUrl = div.getAttribute('data-image');
			var img = document.createElement('img');
			img.src = imageUrl;
			img.onload = function() {
				div.style.backgroundImage = 'url(' + imageUrl + ')';
			}
		}
	}
}

App.init();
