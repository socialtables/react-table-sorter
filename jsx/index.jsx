var TableSorter = require("./table-sorter/table-sorter.jsx");
var DataTools = require("./data-tools/data-tools.jsx")


// Sample config object
var config = {
  sort: { column: "hexValue", order: "asc" },
  columns: {
    colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
    hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
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
        <DataTools onSourceChange={this.handleSourceChange} source={this.state.source} />
        <TableSorter dataSource={this.state.source} config={this.props.config} headerRepeat="5" />
      </div>
    );
  }
});

var app = document.getElementById('app');


React.renderComponent(<App source="json/colors.json" config={config}/>, app);