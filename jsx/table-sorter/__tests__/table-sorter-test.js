/** @jsx React.DOM */
jest.dontMock('../table-sorter.js');
describe('CheckboxWithLabel', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var TableSorter = require('../table-sorter.js');
    var TestUtils = React.addons.TestUtils;

    // Sample config object
    var config = {
      sort: { column: "hexValue", order: "asc" },
      columns: {
        colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
        hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
        red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
      }
    };

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <TableSorter dataSource="../json/colors.json" config={config} headerRepeat="5" />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'label');
    expect(label.getDOMNode().textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');
  });
});