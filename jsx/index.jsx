var TableSorter = require("./table-sorter/table-sorter.jsx");
var DataTools = require("./data-tools/data-tools.jsx")

var App = React.createClass({
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
React.renderComponent(<App TableSorter="/testing" config="hello"/>, app);



// Sample config object
// var CONFIG = {
//   sort: { column: "id", order: "asc" },
//   columns: {
//     first_name: { name: "First Name", filterText: "", defaultSortOrder: "asc"},
//     last_name: { name: "Last Name", filterText: "", defaultSortOrder: "asc"},
//     id: { name: "id", filterText: "", defaultSortOrder: "asc", link: "/editUser?user={cell}"},
//     parent_team_id: { name: "Parent Team ID", filterText: "", defaultSortOrder: "asc"},
//     team_role: { name: "Team Role", filterText: "", defaultSortOrder: "asc"},
//     lastLoginStr: { name: "Last Login", filterText: "", defaultSortOrder: "asc"},
//     eventCount: { name: "eventCount", filterText: "", defaultSortOrder: "asc"},
//     objectAverage: { name: "numObjects", filterText: "", defaultSortOrder: "asc"}
//   }
// };