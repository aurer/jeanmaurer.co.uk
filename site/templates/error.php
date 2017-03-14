<?= snippet('header') ?>
    <div class="Section Section--error" id="Section-error">
        <div class="Section-inner">
            <h2><?php echo $page->title() ?> <?php echo http_response_code() ?></h2>
            <?php echo $page->text()->kirbytext() ?>
        </div>
    </div>
<?= snippet('footer') ?>
