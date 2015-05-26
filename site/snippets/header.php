<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <?php echo css('assets/dist/css/screen.css') ?>

</head>
<body>
  <div class="site-container">
    <header class="section section--header">
      <div class="section-inner">
        <h1><?php echo $site->title() ?></h1>
        <p><?php echo $site->description() ?></p>
      </div>
    </header>    
  