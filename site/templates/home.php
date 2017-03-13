<?php snippet('header') ?>

	<section class="Section Section--intro" id="section-intro">
		<div class="Section-inner">
			<header>
          <h1><a href="/"><?php echo $site->title() ?></a></h1>
          <h2>Keyboard Instrument Restoration</h2>
      </header>
      <main>
        <p><?php echo $site->description() ?></p>
      </main>
      <footer>
        <?php if ($site->email() != ''): ?>
          <a href="mailto:<?php echo $site->email() ?>" class="Button">Get in touch</a>
        <?php endif ?>
      </footer>
		</div>
	</section>

<?php snippet('footer') ?>
