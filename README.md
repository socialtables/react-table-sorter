# A React.js Table Sorter Component #

A sortable table component using [Facebook's React](http://facebook.github.io/react/).  

Features:

- Remote data loading
- Sortable columns
- Filterable columns
- Repeatable headers

[View the running demo](http://bgerm.github.io/react-table-sorter-demo/).

## Usage ##
Sortable Table takes two arguments, `source` and `config`. `source` is a string designating the path to a JSON formatted data source and `config` is a JavaScript object containing information about the structure of the table.

## Example ##

    var CONFIG = {
      sort: { column: "col2", order: "desc" },
      columns: {
        col1: { name: "Col1", filterText: "", defaultSortOrder: "desc"},
        col2: { name: "Col2", filterText: "", defaultSortOrder: "desc"},
        col3: { name: "Col3", filterText: "", defaultSortOrder: "desc"}
      }
    };

    React.renderComponent(<TableSorter dataSource="/api/data.json" config={CONFIG} headerRepeat="5" />, document.getElementById("table-sorter"));

## Running the Demo ##

[node-static](https://github.com/cloudhead/node-static) is a quick solution.

    npm install -g node-static
    static

And now view at: [http://localhost:8080/](http://localhost:8080/).

## Screenshots ##

[![Demo Screenshot](http://i.imgur.com/vy5sMuW.png)](http://bgerm.github.io/react-table-sorter-demo/)
