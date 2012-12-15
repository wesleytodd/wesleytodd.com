<?php wp_enqueue_script( 'comment-reply' ); get_header(); ?>
<div id="content-inner">
	<div id="content">
			<?php get_template_part('sub-header');
			get_template_part('loop', 'single'); ?>
			<?php comments_template(); ?>
		</div>
	<?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>