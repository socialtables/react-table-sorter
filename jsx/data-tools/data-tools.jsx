/* Here we create a two selects to control the remote data source of the 
 * TableSorter component. The purpose of this is to show how to control a 
 * component with another component.
 */
var DataTools = module.exports = React.createClass({
  handleSourceChange: function(event) {
    this.props.onSourceChange({
      source: event.target.value,
      limit: this.props.source.limit
    });
  },
  handleLimitChange: function(event) {
    this.props.onSourceChange({
      source: this.props.source.source,
      limit: event.target.value
    });
  },
  render: function() {
    return (
      <div id="tools">
        <strong>Source:</strong> 
        <select onChange={this.handleSourceChange} value={this.props.source.source}>
          <option value="source1">Source 1</option>
          <option value="source2">Source 2</option>
        </select>

        <strong>Limit:</strong> 
        <select onChange={this.handleLimitChange} value={this.props.source.limit}>
          <option value="10">10</option>
          <option value="200">200</option>
        </select>
      </div>
    );
  }
});