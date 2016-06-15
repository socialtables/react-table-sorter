var TableSorter = require("../../lib/index.js");
var React = require("react");
var React = require("reactdom");

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
  render: function() {
    return (
      <div>
        <TableSorter dataSource={this.props.source} config={this.props.config} headerRepeat="5" />
      </div>
    );
  }
});

var app = document.getElementById('app');


ReactDOM.render(<App source="./json/colors.json" config={config}/>, app);
