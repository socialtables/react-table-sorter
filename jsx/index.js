import React from "react";
import ReactDOM from "react-dom";
import TableSorter from "./table-sorter/table-sorter.js";



// Sample config object
var config = {
	sort: { column: "hexValue", order: "asc" },
	columns: {
		colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
		hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
		red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
	}
};

class App extends React.Component {
  render: function() {
    return (
      <div>
        <TableSorter dataSource={this.props.source} config={this.props.config} headerRepeat="5" />
      </div>
    );
  }
};

var app = document.getElementById('app');


ReactDOM.render(<App source="json/colors.json" config={config}/>, app);