"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var React = require("react");
var _ = require("lodash");

// TableSorter React Component
var TableSorter = module.exports = React.createClass({
  displayName: "exports",

  getInitialState: function getInitialState() {
    return {
      items: this.props.initialItems || [],
      sort: this.props.config.sort || { column: "", order: "" },
      columns: this.props.config.columns
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    // Load new data when the dataSource property changes.
    if (nextProps.dataSource != this.props.dataSource || nextProps.data != this.props.data) {
      this.loadData(nextProps.dataSource, nextProps.data);
    }
  },
  componentWillMount: function componentWillMount() {
    this.loadData(this.props.dataSource, this.props.data);
  },
  loadData: function loadData(dataSource, data) {
    if (!data) {
      request = new XMLHttpRequest();
      request.open('GET', dataSource, true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          data = JSON.parse(request.responseText);
          data.forEach(function (item) {
            for (var key in item) {
              // allows text or react components
              if (!item[key]) {
                item[key] = { "text": "none" };
              } else if (_typeof(item[key]) !== 'object' || item[key].props) {
                item[key] = { "text": item[key] };
              }
            }
          });
          console.log("Received data");
          this.setState({ items: data });
        } else {
          // We reached our target server, but it returned an error
          console.log("Error loading JSON");
        }
      }.bind(this);

      request.onerror = function () {
        // There was a connection error of some sort
        console.log("Connection error. Could not retrieve JSON");
      };

      request.send();
    } else {
      data.forEach(function (item) {
        for (var key in item) {
          if (!item[key]) {
            item[key] = { "text": "none" };
          } else if (_typeof(item[key]) !== 'object' || item[key].props) {
            item[key] = { "text": item[key] };
          }
        }
      });
      this.setState({ items: data });
    }
  },
  handleFilterTextChange: function handleFilterTextChange(column) {
    return function (newValue) {
      var obj = this.state.columns;
      obj[column].filterText = newValue;

      // Since we have already mutated the state, just call forceUpdate().
      // Ideally we'd copy and setState or use an immutable data structure.
      this.forceUpdate();
    }.bind(this);
  },
  columnNames: function columnNames() {
    return Object.keys(this.state.columns);
  },
  sortColumn: function sortColumn(column) {
    return function (event) {
      var newSortOrder = this.state.sort.order == "asc" ? "desc" : "asc";

      if (this.state.sort.column != column) {
        newSortOrder = this.state.columns[column].defaultSortOrder;
      }

      this.setState({ sort: { column: column, order: newSortOrder } });
    }.bind(this);
  },
  sortClass: function sortClass(column) {
    var ascOrDesc = this.state.sort.order == "asc" ? "headerSortAsc" : "headerSortDesc";
    return this.state.sort.column == column ? ascOrDesc : "";
  },
  render: function render() {
    var rows = [];

    var columnNames = this.columnNames();
    var filters = {};

    // Inequality function map for the filtering
    var operators = {
      "<": function _(x, y) {
        return x < y;
      },
      "<=": function _(x, y) {
        return x <= y;
      },
      ">": function _(x, y) {
        return x > y;
      },
      ">=": function _(x, y) {
        return x >= y;
      },
      "==": function _(x, y) {
        return x == y;
      }
    };

    var operandRegex = /^((?:(?:[<>]=?)|==))\s?([-]?\d+(?:\.\d+)?)$/;

    columnNames.forEach(function (column) {
      var filterText = this.state.columns[column].filterText;
      filters[column] = null;

      if (filterText.length > 0) {
        operandMatch = operandRegex.exec(filterText);
        if (operandMatch && operandMatch.length == 3) {
          filters[column] = function (match) {
            return function (x) {
              return operators[match[1]](x, match[2]);
            };
          }(operandMatch);
        } else {
          filters[column] = function (x) {
            return x.toString().toLowerCase().indexOf(filterText.toLowerCase()) > -1;
          };
        }
      }
    }, this);

    var filteredItems = _.filter(this.state.items, function (item) {
      return _.every(columnNames, function (c) {
        return !filters[c] || filters[c](item[c].text);
      }, this);
    }, this);

    var sortedItems = _.sortBy(filteredItems, this.state.sort.column);

    if (this.state.sort.order === "desc") sortedItems.reverse();

    var headerExtra = function () {
      return columnNames.map(function (c, i) {
        return React.createElement(
          "th",
          { key: "header-extra-" + i, className: "header-extra" },
          this.state.columns[c].name
        );
      }, this);
    }.bind(this);

    var cell = function (x) {
      return columnNames.map(function (c, i) {
        //custom link defined in data
        if (x[c].link) {
          return React.createElement(
            "td",
            { key: "cell-item-" + i },
            React.createElement(
              "a",
              { href: x[c].link },
              x[c].text
            )
          );
          // link defined in config for entire column
        } else if (this.props.config.columns[c].link) {
            var link = this.props.config.columns[c].link.replace("{cell}", x[c].text);
            return React.createElement(
              "td",
              { key: "cell-item-" + i },
              React.createElement(
                "a",
                { href: link },
                x[c]
              )
            );
            // simple cell
          } else {
              return React.createElement(
                "td",
                { key: "cell-item-" + i },
                x[c].text
              );
            }
      }, this);
    }.bind(this);

    var keyIndex = 0;
    sortedItems.forEach(function (item, idx) {
      var headerRepeat = parseInt(this.props.headerRepeat, 10);
      if (this.props.headerRepeat > 0 && idx > 0 && idx % this.props.headerRepeat === 0) {

        rows.push(React.createElement(
          "tr",
          { key: "header-" + keyIndex },
          headerExtra()
        ));
      }

      rows.push(React.createElement(
        "tr",
        { key: keyIndex },
        cell(item)
      ));
      keyIndex++;
    }.bind(this));

    var filterLink = function (column) {
      return {
        value: this.state.columns[column].filterText,
        requestChange: this.handleFilterTextChange(column)
      };
    }.bind(this);

    var header = columnNames.map(function (c, i) {
      return React.createElement(
        "th",
        { key: "filter-header-" + i, onClick: this.sortColumn(c), className: "header " + this.sortClass(c) },
        this.state.columns[c].name
      );
    }, this);

    var filterInputs = columnNames.map(function (c, i) {
      return React.createElement(
        "td",
        { key: "filter-input-" + i },
        React.createElement("input", { type: "text", valueLink: filterLink(c) })
      );
    }, this);

    return React.createElement(
      "table",
      { cellSpacing: "0", className: "tablesorter" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          header
        ),
        React.createElement(
          "tr",
          null,
          filterInputs
        )
      ),
      React.createElement(
        "tbody",
        null,
        rows
      )
    );
  }
});
