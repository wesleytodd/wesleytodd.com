<?php get_header(); the_post(); ?>
<div id="content-inner">
	<div id="content">
		<?php get_template_part('sub-header'); ?>
		<article class="article" id="error-404" >
			<h1>Oops.</h1>
			<p>Whatever you were looking for is not here.  I don't know why and I am guessing you don't know either.  Sorry for the inconvience, but you can try <a title="Contact" href="/contact">contacting me</a> or visiting the <a title="Home" href="/" >home page.</a></p>
		</article>
	</div>
	<?php get_sidebar(); ?>	
</div>
<?php get_footer(); ?>