<?php $files = $section->files(); ?>
<?php if ($files->first()): ?>
	<div class="Grid Grid--pad">
		<div class="Grid-cell u-lg-size1of2">
			<img src="<?= $files->first()->url() ?>" alt="">
		</div>
		<div class="Grid-cell u-lg-suze1of2">
			<?= $section->text()->kirbytext() ?>
		</div>
	</div>
<?php else: ?>
	<?= $section->text()->kirbytext() ?>
<?php endif ?>
