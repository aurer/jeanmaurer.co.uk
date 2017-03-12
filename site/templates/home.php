<?php snippet('header') ?>

	<section class="Section Section--intro" id="section-intro">
		<div class="Section-inner">
			<header>
          <h1><a href="/"><?php echo $site->title() ?></a></h1>
      </header>
      <main>
        <p><?php echo $site->description() ?></p>
      </main>
      <footer>
        <a href="mailto:<?php echo $site->email() ?>" class="Button"><?php echo $site->email() ?></a>
      </footer>
		</div>
	</section>

<?php snippet('footer') ?>
