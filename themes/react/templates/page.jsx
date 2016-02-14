var React = require('react');
var Header = require('../components/header.jsx');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header site={this.props.site} />
				<header id="content-header">
					<small className="date">{this.props.page.month}.{this.props.page.day}.{this.props.page.year}</small>
					<h1>{this.props.page.title}</h1>
				</header>
				<section className="section" dangerouslySetInnerHTML={{__html: this.props.page.content}}></section>
			</div>
		);
	}
});
