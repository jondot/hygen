module.exports =
{
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  "parserOptions": {
    "project": "./tsconfig.json",
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  'rules': {
    "prettier/prettier": [
      "error",
      {
        "semi": false,
        "singleQuote": true
      }
    ],
    "prettier/semi": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "jsx-quotes": 0,
    "react/jsx-filename-extension": "off"
  },
  "settings": {
  },
}
