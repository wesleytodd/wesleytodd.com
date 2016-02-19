var React = require('react');
var Header = require('../components/header.jsx');

module.exports = React.createClass({
	render: function () {
		return (
			<div>
				<Header site={this.props.site} />
				<header id="content-header">
					<h1>Content Index</h1>
				</header>
				{this.props.items.map((i) => {
					return <h2 key={i.slug}>{i.title}</h2>;
				})}
			</div>
		);
	}
});
