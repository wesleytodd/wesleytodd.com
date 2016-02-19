var React = require('react');
var Header = require('../components/header.jsx');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header site={this.props.site} />
				<header id="content-header">
					<small className="date">{this.props.post.month}.{this.props.post.day}.{this.props.post.year}</small>
					<h1>{this.props.post.title}</h1>
				</header>
				<section className="section" dangerouslySetInnerHTML={{__html: this.props.post.content}}></section>
			</div>
		);
	}
});
