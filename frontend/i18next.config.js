import { defineConfig } from "i18next-cli";

// Ключи вынимаются из кода, а не поддерживаются руками: пропущенный перевод
// иначе виден только тогда, когда на него наткнулся пользователь, и только на
// одном из языков.
//
// Типы здесь не генерируются: пакет на JS, проверять ключи компилятором нечем.
export default defineConfig({
  locales: ["ru", "en"],
  extract: {
    input: ["src/**/*.{js,jsx}"],
    output: "src/locales/{{language}}/{{namespace}}.json",
    defaultNS: "translation",
    primaryLanguage: "ru",
    // Сообщения валидации это ключи в схеме yup: их подставляет formik, и в
    // t() попадает переменная. Статически такой ключ не виден, поэтому без
    // этой строки extract вычистил бы половину раздела signup.
    preservePatterns: ["signup.*"],
  },
});
