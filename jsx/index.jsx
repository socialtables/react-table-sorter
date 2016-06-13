var React = require("react");
var ReactDOM = require("react-dom");
var TableSorter = require("./table-sorter/table-sorter.jsx");



// Sample config object
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
    return (
      <div>
        <TableSorter dataSource={this.state.source} config={this.props.config} headerRepeat="5" />
      </div>
    );
  }
});

var app = document.getElementById('app');


ReactDOM.render(<App source="json/colors.json" config={config}/>, app);
