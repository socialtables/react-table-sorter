# A React.js Table Sorter Component #

React Table Sorter takes JSON or Javascript arrays as well as a config object and creates a sortable table component using [Facebook's React](http://facebook.github.io/react/).  

Features:

- Remote data loading
- Sortable columns
- Filterable columns
- Repeatable headers

This module has been adapted from the [demo](http://bgerm.github.io/react-table-sorter-demo/) created by [Bryan Germann](https://github.com/bgerm) to work with npm and to add flexibility during configuration.

## Installation ##

TODO: Install instructions will be added once complete.

## Usage ##
Sortable Table takes two arguments, `source` and `config`. `source` is a string designating the path to a JSON array formatted data source and `config` is a JavaScript object containing information about the structure of the table.

## Example ##

    var TableSorter = require("TableSorter");

    var config = {
      sort: { column: "hexValue", order: "asc" },
      columns: {
        colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
        hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
        red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
      }
    };
    
    React.renderComponent(<TableSorter dataSource="/api/data.json" config={CONFIG} headerRepeat="5" />, document.getElementById("table-sorter"));