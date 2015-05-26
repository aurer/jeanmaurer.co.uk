<?php echo $section->text()->kirbytext() ?>
<div class="gallery">
	<div class="grid grid--pad">
		<?php foreach ($section->images()->limit(4) as $image) : ?>
			<?php echo snippet('gallery-image', ['image' => $image]) ?>
		<?php endforeach ?>
	</div>
</div>