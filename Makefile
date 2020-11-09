.PHONY: serve
serve:
	zola serve

.PHONY: build
build:
	zola build

.PHONY: deploy
deploy: build
	netlify deploy --prod --dir=public