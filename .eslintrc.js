module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  "parser": "babel-eslint",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  "ignorePatterns": ["webpack.config.js", ".eslintrc.js", "babel.config.js"],
  rules: {
    "indent": [
      "error", 4
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "always"
    ],
    "no-restricted-syntax": [
        "error",
        "WithStatement",
        "BinaryExpression[operator='in']"
    ]
  },
};
