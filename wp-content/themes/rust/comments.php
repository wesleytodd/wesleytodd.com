<?php
/**
 * The template for displaying Comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.  The actual display of comments is
 * handled by a callback to twentyten_comment which is
 * located in the functions.php file.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */
?>
			<div id="comments">
<?php if ( post_password_required() ) : ?>
				<p class="nopassword"><?php _e( 'This post is password protected. Enter the password to view any comments.', 'twentyten' ); ?></p>
			</div><!-- #comments -->
<?php
		return;
	endif;
?>
<?php if ( have_comments() ) : ?>
			<h3 id="comments-title">What People Are Saying...</h3>
			<ol class="commentlist">
				<?php wp_list_comments(); ?>
			</ol>
<?php else :
	if ( ! comments_open() ) :
?>
	<p class="nocomments"><?php _e( 'Comments are closed.'); ?></p>
<?php endif; // end ! comments_open() ?>
<?php endif; // end have_comments() ?>
<?php comment_form(array('title_reply'=> 'Join The Discussion...')); ?>
</div><!-- #comments -->
