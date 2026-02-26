.PHONY: all install build package clean help

ENVIRONMENT ?= staging

help:
	@echo "Usage: make [target] ENVIRONMENT=[development|staging|production]"
	@echo ""
	@echo "Targets:"
	@echo "  install     Install dependencies"
	@echo "  build       Build the React app"
	@echo "  package     Package the WordPress plugin zip"
	@echo "  deploy      Run all steps (install, build, package)"
	@echo "  clean       Remove build artifacts"
	@echo ""
	@echo "Example: make deploy ENVIRONMENT=staging"

install:
	@echo "Installing dependencies..."
	yarn install

build:
	@echo "Building React app for $(ENVIRONMENT)..."
	CI=false REACT_APP_ENV=$(ENVIRONMENT) yarn build

package:
	@echo "Packaging WordPress plugin..."
	mkdir -p wordpress/lbh-fss-public-frontend
	cp -r build wordpress/lbh-fss-public-frontend/build
	cd wordpress && zip -r ../fss-directory.zip . \
		-x "*.git*" \
		-x "*.zip" \
		-x "export-plugin.sh" \
		-x "lbh-fss-public-frontend/node_modules/*"
	@echo "Plugin packaged at fss-directory.zip"
	@echo "Contents:"
	@unzip -l fss-directory.zip | grep "static/"

deploy: install build package
	@echo "Done! Upload fss-directory.zip to WordPress."

clean:
	@echo "Cleaning build artifacts..."
	rm -rf build
	rm -f fss-directory.zip
	rm -rf wordpress/lbh-fss-public-frontend/build
