<?php 
	$thumb_options = array(
		'width' => 200,
		'height' => 200,
		'crop' => true
	);
?>
<div class="gallery">
	<?php foreach ($section->images() as $image) : ?>
		<a href="<?php echo $image->url() ?>">
			<?php echo thumb($image, $thumb_options) ?>
		</a>
	<?php endforeach ?>
</div>