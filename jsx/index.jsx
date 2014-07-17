var React = require('react/addons');
var TableSorter = require('./table-sorter/table-sorter.jsx');

var config = {
	sort: { column: "hexValue", order: "asc" },
	columns: {
		colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
		hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
		red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
	}
};

var App = React.createClass({
	getInitialState: function() {
		return {source: this.props.source};
	},
	handleSourceChange: function(source) {
		this.setState({source: source});
	},
	render: function() {
		return (React.DOM.div(TableSorter({dataSource: this.state.source, config:this.props.config, headerRepeat:"5"}) ));
	}
});

var app = document.getElementById('app');


React.renderComponent(App({source:"json/colors.json", config:config}), app);