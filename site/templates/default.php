<?php snippet('header') ?>

  <?php foreach ($pages->visible() as $section) : ?>
  	<div class="Section Section--<?php echo $section->uid() ?>" id="section-<?php echo $section->uid() ?>">
  		<div class="Section-inner">
  			<h2><?php echo $section->title() ?></h2>
  			<?php
          $snippet = snippet($section->uid(), array('section' => $section), true);
          echo $snippet ? $snippet : $section->text()->kirbytext();
        ?>
  		</div>
  	</div>
  <?php endforeach ?>

<?php snippet('footer') ?>
