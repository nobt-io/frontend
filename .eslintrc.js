let config = require("./webpack.config")({}, {});

module.exports = {
  parser: "babel-eslint",
  plugins: [
    "babel",
    "react",
    "promise",
    "import",
    "prettier"
  ],
  extends: [
    "eslint:recommended", "prettier", "prettier/react"
  ],
  env: {
    "browser": true,
    "es6": true,
    "jest": true
  },
  globals: {
    "__DEV__": false,
    "Raven": false,
    "exports": false,
    "module": false
  },
  settings: {
    "import/resolver": {
      "webpack": {
        "config": config
      }
    }
  },
  rules: {
    "no-undef": 2,
    "import/no-unresolved": 2,
    "import/named": 2,
    "import/default": 2,
    "no-unused-vars": 0
  }
};
