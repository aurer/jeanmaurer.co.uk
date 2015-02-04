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
  <header class="container container--header" role="banner">
    <div class="container-inner">
      <?php snippet('menu') ?>
    </div> 
  </header>
  <div class="container container--main" role="main">
    <div class="container-inner">
