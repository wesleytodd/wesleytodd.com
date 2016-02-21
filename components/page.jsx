var React = require('react');
var Header = require('./header.jsx');

module.exports = React.createClass({
	render: function () {
		return (
			<div className="page-container">
				<Header site={this.props.site} />
				<header id="content-header">
					<h1>{this.props.page.title}</h1>
				</header>
				<div className="content-container" dangerouslySetInnerHTML={{__html: this.props.page.content}} />
			</div>
		);
	}
});
