<?php get_header(); the_post(); ?>
<div id="content-inner">
	<div id="content">
		<?php get_template_part('sub-header'); ?>
		<article class="article" id="article-<?php the_ID(); ?>" >
			<?php the_content(); ?>
		</article>
	</div>
	<?php get_sidebar(); ?>	
</div>
<?php get_footer(); ?>