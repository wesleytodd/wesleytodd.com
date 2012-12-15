<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<!-- www.phpied.com/conditional-comments-block-downloads/ -->
	<!--[if IE]><![endif]-->
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<!-- Place favicon.ico and apple-touch-icon.png in the root of your domain and delete these references -->
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<!--[if lt IE 8]>
		<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/inc/css/ie6.css" />
	<![endif]-->
	<script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script>
	<!-- Wordpress Stuff -->
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<?php wp_head(); ?>
	
</head>
<body <?php body_class(); ?>>
<header>
	<div class="inner-wrap">
		<a href="<?php bloginfo('url'); ?>" id="logo" title="<?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>"><img width="220" height="114" src="<?php bloginfo('template_url'); ?>/images/wt-logo-rust.jpg" alt="<?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>"/></a>
		<?php 
		wp_nav_menu( array(	'theme_location' => 'main-nav',
							'container' => 'nav',
							'container_id' => 'header-main-navigation' ));
		?>
	</div>
</header>
<div id="content-wrap">