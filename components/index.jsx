var React = require('react');
var Header = require('./header.jsx');

module.exports = React.createClass({
	render: function () {
		var item = this.props.page || this.props.project;
		return (
			<div className="page-container">
				<Header site={this.props.site} />
				<header id="content-header">
					<h1>{item.title}</h1>
				</header>
				<div className="content-container" dangerouslySetInnerHTML={{__html: item.content}} />
			</div>
		);
	}
});
