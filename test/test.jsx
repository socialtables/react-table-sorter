// *
//  * @jsx React.DOM
//  */
// "use strict";
// var ReactTestUtils;

// var testConfig = {
//   sort: { column: "hexValue", order: "asc" },
//   columns: {
//     colorName: { name: "Color Name", filterText: "", defaultSortOrder: "asc"},
//     hexValue: { name: "Hex Value", filterText: "", defaultSortOrder: "asc", link: "/color?hex={cell}"},
//     red: { name: "Red", filterText: "", defaultSortOrder: "asc"}
//   }
// };


// describe("TableSorter Test",function(){
// 	beforeEach(function() {
//         ReactTestUtils = React.addons.ReactTestUtils;
//     });

//     it("Check Text Assignment", function () {
//         var label = <TableSorter dataSource="../json/colors.json" config={testConfig} headerRepeat="5"/>;
//         ReactTestUtils.renderIntoDocument(label);
//         expect(label.refs.p).toBeDefined();
//         expect(label.refs.p.props.children).toBe("Some Text We Need for Test")
//     });

//     it("Click", function () {
//         var label  = <TableSorter dataSource="../json/colors.json" config={testConfig} headerRepeat="5"/>;
//         ReactTestUtils.renderIntoDocument(label);

//         ReactTestUtils.Simulate.click(label.refs.p);
//         expect(label.refs.p.props.children).toBe("Text After Click");
//     });

// });









// var ReactTestUtils = React.addons.TestUtils;
// var assert = require("assert");
// var TableSorter = require("../jsx/index.jsx");
// var jsdom = require('jsdom').jsdom;
// // var document = jsdom('<html><body><div id="app"></div></body></html>');
// // var window = document.parentWindow;






// console.log("TableSorter:", TableSorter);
// var tableSorter = ReactTestUtils.renderIntoDocument(TableSorter({ source: "/someSource", config: global.config}));

// describe('Array', function(){
//   describe('#indexOf()', function(){
//     it('should return -1 when the value is not present', function(){
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//     })
//   })
// })
// describe("CONNECTION -- ", function() {

//   beforeEach(function() {
//     initDOM();
//   });

//   afterEach(function() {
//     cleanDOM();
//   });

//     it("should connect to source if available", function() {
//       var tableSorter = ReactTestUtils.renderIntoDocument(TableSorter({ source: "/someSource", config: global.config}));
//       console.log("hello");
//       assert.equal(2, 2);
//     });

//     it("Click", function () {
//       var label = ReactTestUtils.renderIntoDocument(TableSorter({ message: "Some Text We Need to Test"}));

//         ReactTestUtils.Simulate.click(label.refs.p.getDOMNode());
//         assert.equal(label.refs.p.props.children, "Text After Click");
//     });
// });



// // var assert = require("assert")
// // describe('Connection', function(){
// //   var db = new Connection
// //     , tobi = new User('tobi')
// //     , loki = new User('loki')
// //     , jane = new User('jane');

// //   beforeEach(function(done){
// //     db.clear(function(err){
// //       if (err) return done(err);
// //       db.save([tobi, loki, jane], done);
// //     });
// //   })

// //   describe('#find()', function(){
// //     it('respond with matching records', function(done){
// //       db.find({ type: 'User' }, function(err, res){
// //         if (err) return done(err);
// //         res.should.have.length(3);
// //         done();
// //       })
// //     })
// //   })
// // })



// /*
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