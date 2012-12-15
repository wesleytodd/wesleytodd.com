<?php get_header(); the_post(); ?>
<div id="content-inner">
	<div id="content">
		<?php get_template_part('sub-header'); ?>
		<article class="page-content" id="article-<?php the_ID(); ?>" >
			<?php the_content(); ?>
		</article>
		
		<section id="home-page-posts">
			<h2>My Recent Articles</h2>
			<?php
			$q = new WP_Query(array(
				'posts_per_page'	=> 3,
				'category_name'		=> 'web-development'
			));
			if ($q->have_posts()) : while ($q->have_posts()) : $q->the_post();
			?>
				<article class="article" id="article-<?php the_ID(); ?>" >
					<?php if ( has_post_thumbnail() && !is_singular() ) { ?>
					<div class="featured-image">
						<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
							<?php the_post_thumbnail( 'medium' ); ?>
						</a>
					</div>
					<?php } ?>
					<div class="article-header">
						<div class="post-info">
							<span class="comments">(<?php comments_popup_link( __( 'Leave a comment' ), __( '1 Comment' ), __( '% Comments' ) ); ?>)</span> <span class="date">{<?php the_date('m.d.Y'); ?>}</span>
						</div>
						<h1 class="article-title"><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
					</div>
					<div class="article-content">
						<?php if(is_single()) the_content(); else the_excerpt(); ?>
					</div>
					<div class="article-footer">
						<div class="facebook-buttons">
							<div id="fb-root"></div>
							<fb:like href="<?php echo get_permalink(); ?>" send="true" width="450" show_faces="false" font=""></fb:like>
						</div>
					</div>
				</article>
			<?php
			endwhile; else:
			?>
			
				<p>Nothing matches your query.</p>
			
			<?php
			endif;
			?>
		</section>
	</div>
	<?php get_sidebar(); ?>	
</div>
<?php get_footer(); ?>