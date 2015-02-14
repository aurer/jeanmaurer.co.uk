<?php snippet('header') ?>
	
  <?php foreach ($pages->visible() as $section) : ?>
  	<div class="container" id="section-<?php echo $section->uid() ?>">
  		<div class="container-inner">
  			<h2><?php echo $section->title() ?></h2>
  			<?php echo $section->text()->kirbytext() ?>
  			<?php snippet($section->uid(), ['section' => $section]) ?>
  		</div>
  	</div>
  <?php endforeach ?>

<?php snippet('footer') ?>