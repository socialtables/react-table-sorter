## Variables
INDEX_JS = js/index.js
JSX_SRC_DIR = jsx
INDEX_JSX = jsx/index.js

JSX_DEPENDENCIES = $(shell find $(JSX_SRC_DIR) -name "*.js")

# Tasks
all: js

js: $(INDEX_JS)


## Recipes
$(INDEX_JS): $(JSX_DEPENDENCIES)
	./node_modules/.bin/browserify -t reactify $(INDEX_JSX) > $(INDEX_JS)
	./node_modules/.bin/browserify -t reactify jsx/table-sorter/table-sorter.js > js/table-sorter/table-sorter.js

## Cleanup task
clean:
	rm -f $(INDEX_JS)

.PHONY: install uninstall clean