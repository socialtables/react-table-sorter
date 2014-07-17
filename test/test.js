






/*
TESTS
describe connection
  it should connect to source if available
  it should use data object if no source provided
  it should use data object if source returns error

describe render
  it should render table if it finds data and config
  it should render table with warning message if no data
  it should render table of data without labels if no config
  it should not render if no data or config
  it should render links for entire rows where "link" attribute is present in config
  it should replace "{cell}"" with cell's toString value when present in "link" attribute of config
  it should render links for items with "link" attribute in data
  it should render link from data over link from config

describe interactions
  it should sort items based on toString of item attributes
  it should filter items based on toString index matching of item and filter text
  it should filter numerical items based on operational values: ==, >, <, >=, <= */
