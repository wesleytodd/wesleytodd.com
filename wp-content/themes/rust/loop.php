<?php
if (have_posts()) : while (have_posts()) : the_post();
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
			<h1 class="article-title"><?php if(!is_singular()){ ?><a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php } the_title(); ?><?php if(!is_singular()){ ?></a><?php } ?></h1>
			<div class="facebook-buttons">
				<div id="fb-root"></div>
				<fb:like href="<?php echo get_permalink(); ?>" send="true" layout="button_count" width="450" show_faces="false" font=""></fb:like>
			</div>
		</div>
		<div class="article-content">
			<?php if(is_single()) the_content(); else the_excerpt(); ?>
		</div>
		<div class="article-footer"></div>
	</article>
<?php
endwhile; else:
?>

	<p>Nothing matches your query.</p>

<?php
endif;
?>