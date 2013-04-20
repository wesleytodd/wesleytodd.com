<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>{{meta.title}}</title>
        <meta name="description" content="{{meta.description}}">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="/css/global.css">
        <script src="/js/vendor/modernizr.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<header id="navigation">
			<a href="#navigation" class="open"></a>
			<nav id="page-nav">
				<h1 id="page-logo"><a href="/">Wesley Todd - Home</a></h1>
				{{navList types.page.items}}

				<h3>Articles</h2>
				{{navList types.post.items 3}}
			</nav>

			<div id="page-foot">
				<div id="social-nav">
					<ul>
						<li class="social-icon github"><a href="https://github.com/wesleytodd">GitHub</a></li>
						<li class="social-icon wordpress"><a href="http://profiles.wordpress.org/jawesomeclay">WordPress</a></li>
						<li class="social-icon email"><a href="mailto:wes@wesleytodd.com">Email</a></li>
						<li class="social-icon facebook"><a href="http://www.facebook.com/johnwesleytodd">Facebook</a></li>
					</ul>
				</div>
				<span id="site-by" href="http://wesleytodd.com" title="Designed, Developed &amp; Written by Wes Todd">Designed, Developed &amp; Written by Wes Todd</span>
			</div>
		</header>

		<div id="page-content">
			<header id="content-header">
				<small class="date">{{meta.date.month}}.{{meta.date.day}}.{{meta.date.year}}</small>
				<h1>{{meta.title}}</h1>
			</header>
			<section class="section">
				{{{content}}}
			</section>
		</div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="/js/vendor/jquery/jquery.js"><\/script>')</script>
        <script src="/js/global.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
