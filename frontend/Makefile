# Зависимости ставятся из корня: frontend это workspace-пакет, и своего
# lock-файла у него нет.

start:
	pnpm start

build:
	pnpm run build

lint:
	pnpm run lint
	pnpm run format:check

lint-fix:
	pnpm run lint:fix

# Ключи переводов вынимаются из кода: руками src/locales/<lng>/translation.json
# не правится, правится текст под уже вынутым ключом.
i18n-extract:
	npx i18next-cli extract

# Что переведено, а что отстало от ru.
i18n-status:
	npx i18next-cli status
