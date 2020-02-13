module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "webextensions": true
  },
  "extends": [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "whale": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "prettier",
    "@typescript-eslint"
  ],
  "rules": {
    "prettier/prettier": "warn"
  },
};