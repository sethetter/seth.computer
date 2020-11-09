.PHONY: serve
serve:
	zola serve

.PHONY: build
build:
	zola build

.PHONY: deploy
deploy: build
	npx netlify deploy --prod --dir=public