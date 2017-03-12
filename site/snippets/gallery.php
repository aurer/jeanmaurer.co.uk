<?php echo $section->text()->kirbytext() ?>
<div class="Gallery">
	<div class="Grid">
		<?php foreach ($section->images()->limit(6) as $image) : ?>
			<?php echo snippet('gallery-image', ['image' => $image]) ?>
		<?php endforeach ?>
	</div>
</div>
