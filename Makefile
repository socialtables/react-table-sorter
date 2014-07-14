## Variables
INDEX_JS = js/index.js
JSX_SRC_DIR = jsx
INDEX_JSX = jsx/index.jsx

JSX_DEPENDENCIES = $(shell find $(JSX_SRC_DIR) -name "*.jsx")

# Tasks
all: js

js: $(INDEX_JS)


## Recipes
$(INDEX_JS): $(JSX_DEPENDENCIES)
	./node_modules/.bin/browserify -t reactify $(INDEX_JSX) > $(INDEX_JS)

## Cleanup task
clean:
	rm -f $(INDEX_JS)

.PHONY: install uninstall clean