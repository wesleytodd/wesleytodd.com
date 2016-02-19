var React = require('react');

module.exports = React.createClass({
	render: function () {
		return (
			<header id="navigation">
				<a href="#navigation" className="open"></a>
				<nav id="page-nav">
					<div className="page-nav-inner">
						<h1 id="page-logo">
							<a href="/">{this.props.site.hostname} - {this.props.site.tagline}</a>
						</h1>
						<nav className="pages">
							<ul>
								{this.props.site.pages.map(function (p) {
									return <li key={p.pathname}><a href={p.pathname}>{p.title}</a></li>
								})}
							</ul>
						</nav>

						<h3>Articles</h3>
						<nav className="articles">
							<ul>
								{this.props.site.posts.map(function (p, i) {
									if (i > 5) {
										return false;
									}
									return <li key={p.pathname}><a href={p.pathname}>{p.title}</a></li>
								})}
							</ul>
						</nav>
					</div>
				</nav>
				<div id="page-foot">
					<div id="social-nav">
						<ul>
							<li className="social-icon github"><a href="https://github.com/wesleytodd">GitHub</a></li>
							<li className="social-icon wordpress"><a href="http://profiles.wordpress.org/jawesomeclay">WordPress</a></li>
							<li className="social-icon email"><a href="mailto:wes@wesleytodd.com">Email</a></li>
							<li className="social-icon facebook"><a href="http://www.facebook.com/johnwesleytodd">Facebook</a></li>
						</ul>
					</div>
					<span id="site-by" title="Designed, Developed &amp; Written by Wes Todd">Designed, Developed &amp; Written by Wes Todd</span>
				</div>
			</header>
		);
	}
});
