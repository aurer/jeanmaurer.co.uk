<?= snippet('header') ?>
    <div class="container" id="section-error">
        <div class="container-inner">
            <h2><?php echo $page->title() ?> <?php echo http_response_code() ?></h2>
            <?php echo $page->text()->kirbytext() ?>
        </div>
    </div>
<?= snippet('footer') ?>