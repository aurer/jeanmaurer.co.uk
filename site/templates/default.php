<?php snippet('header') ?>
	
  <?php foreach ($pages->visible() as $section) : ?>
  	<div class="section section--<?php echo $section->uid() ?>" id="section-<?php echo $section->uid() ?>">
  		<div class="section-inner">
  			<h2><?php echo $section->title() ?></h2>
  			<?php 
          $snippet = snippet($section->uid(), array('section' => $section), true);
          if ($snippet) {
            echo $snippet;
          } else {
            echo $section->text()->kirbytext();
          }
        ?>
  		</div>
  	</div>
  <?php endforeach ?>

<?php snippet('footer') ?>