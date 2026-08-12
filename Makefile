start-frontend:
	make -C frontend start

start-backend:
	pnpm exec start-server

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

lint-frontend:
	make -C frontend lint

build:
	DISABLE_ESLINT_PLUGIN=true pnpm run build


install:
	pnpm install --frozen-lockfile

lint:
	pnpm --silent run lint
	pnpm --silent run format:check
