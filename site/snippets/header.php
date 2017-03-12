<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
  <meta name="description" content="<?php echo $site->description()->html() ?>">
  <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

  <?php echo css('/assets/css/screen.css') ?>
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">

</head>
<body style="background-image: url(<?php echo thumb($site->files()->first(), array("width" => 30))->dataUri() ?>)" data-image="<?php echo $site->files()->first()->url() ?>">
  <div class="Page">
