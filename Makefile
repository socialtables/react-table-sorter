## Variables
INDEX_JS = js/index.js
JSX_SRC_DIR = jsx
INDEX_JSX = jsx/index.jsx

JSX_DEPENDENCIES = $(shell find $(JSX_SRC_DIR) -name "**.jsx")

TEST_JSX = test/test.jsx
TEST_JS = test/test.js
TEST_DIR = test
TEST_DEPENDENCIES = $(shell find $(TEST_DIR) -name "**.jsx")

# Tasks
all: js test

js: $(INDEX_JS)

test: $(TEST_JS)


## Recipes
$(INDEX_JS): $(JSX_DEPENDENCIES)
	./node_modules/.bin/browserify -t reactify $(INDEX_JSX) > $(INDEX_JS)


## testing
$(TEST_JS): $(TEST_DEPENDENCIES)
	./node_modules/.bin/browserify -t reactify $(TEST_JSX) > $(TEST_JS)

## Cleanup task
clean:
	rm -f $(INDEX_JS)

.PHONY: install uninstall clean