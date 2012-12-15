<?php get_header(); ?>
<div id="content-inner">
	<div id="content">
			<?php get_template_part('sub-header');
			get_template_part('loop', 'index'); ?>
		</div>
	<?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>