var React = require('react');
var Header = require('./header.jsx');
var get = require('lodash.get');

module.exports = React.createClass({
	render: function () {
		var item = this.props.page;
		return (
			<div className="page-container">
				<Header site={this.props.site} />
				<header id="content-header">
					<h1>{item.title}</h1>
				</header>
				<div className="content-container">
					<section id="about" className="section featured-media">
						<header>
							<div className="media">
								<img src="/media/pages/index/wes-todd.jpg" alt="Wes Todd" />
							</div>
							<h1>Who is this guy?</h1>
						</header>
						<div className="content">
							<p>{get(item, 'meta.intro')}</p>
						</div>
					</section>
					<section id="projects" className="section">
						<header>
							<h1>What kind of things does he make?</h1>
						</header>
						<div className="content">
							{this.props.site.projects.map((p) => {
								return (
									<div className="project-item" key={p.slug}>
										<div className="media">
											<a href={get(p, 'meta.githubRepo.html_url')}>
												<img src={get(p, 'meta.projectLogo')} alt={p.title} />
											</a>
										</div>
										<h3><a href={get(p, 'meta.githubRepo.html_url')}>{p.title}</a></h3>
										<div dangerouslySetInnerHTML={{__html: p.content}} />
									</div>
								);
							})}
						</div>
					</section>
				</div>
			</div>
		);
	}
});
