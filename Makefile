start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

lint-frontend:
	make -C frontend lint

build:
	DISABLE_ESLINT_PLUGIN=true npm run build

test:
	npx playwright test

install:
	npm ci
