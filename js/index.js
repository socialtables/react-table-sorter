;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */var TableSorter = require("./table-sorter/table-sorter.jsx");
//var DataTools = require("./data-tools/data-tools.jsx")


// Sample config object
var config = {
	sort: { column: "hexValue", order: "asc" },
	columns: {
		colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
		hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
		red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
	}
};

var App = React.createClass({displayName: 'App',
  getInitialState: function() {
    return {source: this.props.source};
  },
  handleSourceChange: function(source) {
    this.setState({source: source});
  },
  render: function() {
    return (
      React.DOM.div(null, 
        TableSorter( {dataSource:this.state.source, config:this.props.config, headerRepeat:"5"} )
      )
    );
  }
});

var app = document.getElementById('app');


React.renderComponent(App( {source:"json/colors.json", config:config}), app);
},{"./table-sorter/table-sorter.jsx":2}],2:[function(require,module,exports){
/** @jsx React.DOM */// TableSorter React Component
var TableSorter = module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {
      items: this.props.initialItems || [],
      sort: this.props.config.sort || { column: "", order: "" },
      columns: this.props.config.columns
    };
  },
  componentWillReceiveProps: function(nextProps) {
    // Load new data when the dataSource property changes.
    if (nextProps.dataSource != this.props.dataSource) {
      this.loadData(nextProps.dataSource);
    }
  },
  componentWillMount: function() {
    this.loadData(this.props.dataSource);
  },
  loadData: function(dataSource) {
    if (!dataSource) return;

    $.get(dataSource).done(function(data) {
      data.forEach(function(item){
        for (var key in item) {
          if(typeof item[key] !== 'object') {
            item[key] = {"text":item[key]}
          }
        }
      });
      console.log("Received data");
      this.setState({items: data});
    }.bind(this)).fail(function(error, a, b) {
      console.log("Error loading JSON");
    });
  },
  handleFilterTextChange: function(column) {
    return function(newValue) {
      var obj = this.state.columns;
      obj[column].filterText = newValue;

      // Since we have already mutated the state, just call forceUpdate().
      // Ideally we'd copy and setState or use an immutable data structure.
      this.forceUpdate();
    }.bind(this);
  },
  columnNames: function() {
     return Object.keys(this.state.columns); 
  },
  sortColumn: function(column) {
    return function(event) {
      var newSortOrder = (this.state.sort.order == "asc") ? "desc" : "asc";

      if (this.state.sort.column != column) {
          newSortOrder = this.state.columns[column].defaultSortOrder;
      }

      this.setState({sort: { column: column, order: newSortOrder }});
    }.bind(this);
  },
  sortClass: function(column) {
    var ascOrDesc = (this.state.sort.order == "asc") ? "headerSortAsc" : "headerSortDesc";
    return (this.state.sort.column == column) ? ascOrDesc : "";
  },
  render: function() {
    var rows = [];

    var columnNames = this.columnNames();
    var filters = {};

    var operandRegex = /^((?:(?:[<>]=?)|==))\s?([-]?\d+(?:\.\d+)?)$/;

    columnNames.forEach(function(column) {
      var filterText = this.state.columns[column].filterText;
      filters[column] = null;

      if (filterText.length > 0) { 
        operandMatch = operandRegex.exec(filterText);
        if (operandMatch && operandMatch.length == 3) {
          filters[column] = function(match) { return function(x) { return operators[match[1]](x, match[2]); }; }(operandMatch); 
        } else {
          filters[column] = function(x) {
            return (x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1);
          };
        }
      }
    }, this);
    
    var filteredItems = _.filter(this.state.items, function(item) {
      return _.every(columnNames, function(c) {
        return (!filters[c] || filters[c](item[c].text));
      }, this);
    }, this);

    var sortedItems = _.sortBy(filteredItems, function(item) {
      return item[this.state.sort.column].text;
    }, this);

    if (this.state.sort.order === "desc") sortedItems.reverse();

    var headerExtra = function() {
      return columnNames.map(function(c) {
        return React.DOM.th( {className:"header-extra"}, this.state.columns[c].name);
      }, this);   
    }.bind(this);

    var cell = function(x) {
      return columnNames.map(function(c) {
        //custom link defined in data
        if (x[c].link){
          return React.DOM.td(null, React.DOM.a( {href:x[c].link}, x[c].text));
        // link defined in config for entire column
        } else if (this.props.config.columns[c].link) {
         var link = this.props.config.columns[c].link.replace("{cell}", x[c].text);
          return React.DOM.td(null, React.DOM.a( {href:link}, x[c]));
        // simple cell
        } else {
          return React.DOM.td(null, x[c].text);
        }
      }, this);
    }.bind(this);

    sortedItems.forEach(function(item, idx) {
      var headerRepeat = parseInt(this.props.headerRepeat, 10);
      if ((this.props.headerRepeat > 0) && 
          (idx > 0) &&
          (idx % this.props.headerRepeat === 0)) {

          rows.push (
            React.DOM.tr(null, 
               headerExtra() 
            )
          )
      }

      rows.push(
        React.DOM.tr( {key:item.id}, 
           cell(item) 
        )
      );
    }.bind(this));

    var filterLink = function(column) {
      return {
        value: this.state.columns[column].filterText,
        requestChange: this.handleFilterTextChange(column)
      };
    }.bind(this);

    var header = columnNames.map(function(c) {
      return React.DOM.th( {onClick:this.sortColumn(c), className:"header " + this.sortClass(c)}, this.state.columns[c].name);
    }, this);

    var filterInputs = columnNames.map(function(c) {
      return React.DOM.td(null, React.DOM.input( {type:"text", valueLink:filterLink(c)} ));
    }, this);

    return (
      React.DOM.table( {cellSpacing:"0", className:"tablesorter"}, 
        React.DOM.thead(null, 
          React.DOM.tr(null, 
             header 
          ),
          React.DOM.tr(null, 
             filterInputs 
          )
        ),
        React.DOM.tbody(null, 
           rows 
        )
      )
    );
  }
});



// Inequality function map for the filtering
var operators = {
  "<": function(x, y) { return x < y; },
  "<=": function(x, y) { return x <= y; },
  ">": function(x, y) { return x > y; },
  ">=": function(x, y) { return x >= y; },
  "==": function(x, y) { return x == y; }
};
},{}]},{},[1])
;