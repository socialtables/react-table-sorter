// var assert = require("assert");
// var React = require("react/addons");
// var ReactTestUtils = React.addons.TestUtils;
// /*start nonsense*/
// var TableSorter = require("../js/table-sorter/table-sorter.js");

// /*end nonsense*/
// var jsdom = require("jsdom").jsdom;
// var doc = jsdom('<html><head></head><body>hello world</body></html>');
// var window = doc.parentWindow;




// console.log("TableSorter----------------------------------", TableSorter, require("../js/table-sorter/table-sorter.js"));
// //var document = jsdom("<html><head></head><body>hello world</body></html>");
// //var window = document.parentWindow;

// var testConfig = {
//   sort: { column: "hexValue", order: "asc" },
//   columns: {
//     colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
//     hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
//     red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
//   }
// };

// var doc = jsdom.env(
// '<html><head></head><body>hello world</body></html>',
// ["http://code.jquery.com/jquery.js"],
// function (errors, window){ 
// 	}
// )

// describe('connection', function(){

// 	it('should connect to source if available', function(){
// 		var label = TableSorter({dataSource: "../json/colors.json", config: testConfig, headerRepeat:"5" });
//         ReactTestUtils.renderIntoDocument(label);
// 		expect(label.refs.p).toBeDefined();
//         expect(label.refs.p.props.children).toBe("Some Text We Need for Test")
// 	})
// 	describe('#indexOf()', function(){
// 		it('should connect to source if available', function(){
// 			assert.equal(-1, [1,2,3].indexOf(5));
// 			assert.equal(-1, [1,2,3].indexOf(0));
// 		})
// 	})
// })




// TESTS
// describe connection
//   it should connect to source if available
//   it should use data object if no source provided
//   it should use data object if source returns error

// describe render
//   it should render table if it finds data and config
//   it should render table with warning message if no data
//   it should render table of data without labels if no config
//   it should not render if no data or config
//   it should render links for entire rows where "link" attribute is present in config
//   it should replace "{cell}"" with cell's toString value when present in "link" attribute of config
//   it should render links for items with "link" attribute in data
//   it should render link from data over link from config

// describe interactions
//   it should sort items based on toString of item attributes
//   it should filter items based on toString index matching of item and filter text
//   it should filter numerical items based on operational values: ==, >, <, >=, <=
// 