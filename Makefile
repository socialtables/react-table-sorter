## Variables
INDEX_JS = lib/index.js
JSX_SRC_DIR = src
INDEX_JSX = src/index.js

EXAMPLE_JSX = example/src/index.js
EXAMPLE_JS = example/index.js

JSX_DEPENDENCIES = $(shell find $(JSX_SRC_DIR) -name "*.js")

# Tasks
all: build

build: $(INDEX_JS)


## Recipes
$(INDEX_JS): $(JSX_DEPENDENCIES)
	./node_modules/.bin/babel $(INDEX_JSX) -o $(INDEX_JS)
	./node_modules/.bin/babel $(EXAMPLE_JSX) -o $(EXAMPLE_JS)

## Cleanup task
clean:
	rm -f $(INDEX_JS)

.PHONY: install uninstall clean
