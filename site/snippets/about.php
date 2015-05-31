<?php $files = $section->files(); ?>
<?php if ($files): ?>
	<div class="grid grid--pad">
		<div class="col-lg-1of2">
			<img src="<?= $files->first()->url() ?>" alt="">
		</div>
		<div class="col-lg-1of2">
			<?= $section->text()->kirbytext() ?>
		</div>
	</div>
<?php else: ?>
	<?= $section->text()->kirbytext() ?>
<?php endif ?>