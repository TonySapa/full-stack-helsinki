module.exports = {
  "extends": "eslint-config-airbnb",
  "env": {
    "browser": true,
    "jest": true,
    "cypress/globals": true
  },
  "rules": {
    "linebreak-style": [1, "windows"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "quotes": ["error", "double"],
    "react/prop-types": 0,
    "comma-dangle": ["error", "never"]
  },
  "plugins": [
    "react", "cypress"
  ],
};