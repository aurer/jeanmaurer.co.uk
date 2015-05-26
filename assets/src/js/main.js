window.Scripts = {
	run: function() {
		this.addGalleryButton();
		this.addQuickLook();
	},

	addGalleryButton: function() {
		var gallery = $('.gallery .grid');
		var button = $('<button>', {
			class: 'button',
			text: 'More'
		});
		button.on('click', function(e){
			$.ajax({
				url: 'gallery/fetch',
				dataType: 'html',
				beforeSend: function() {
					$('.gallery').addClass('loading');
				},
				success: function(data) {
					gallery.append(data);
					button.remove();
					$('.gallery a').off('click').quicklook();
				},
				complete: function() {
					$('.gallery').removeClass('loading');
				}
			})
			e.preventDefault();
		});
		gallery.after(button);
	},

	addQuickLook: function() {
		$('.gallery a').quicklook();
	}
}

Scripts.run();