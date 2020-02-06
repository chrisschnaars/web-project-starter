var config = {
  env: {
    es6: true,
    browser: true
  },
  extends: "eslint:recommended",
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }]
  },
  parserOptions: { ecmaVersion: 6 }
};
