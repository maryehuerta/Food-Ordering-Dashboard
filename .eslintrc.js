module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "comma-dangle": ["error", "never"],
        "semi": ["error", "always"],
        "no-use-before-define": "off",
        "eol-last": "off",
        "no-mixed-operators": "off",
        "no-underscore-dangle": "off",
        "linebreak-style": "off",
        "import/prefer-default-export": "off",
        "react/jsx-filename-extension": ["error", { "extensions": [".js"] }],
        "react/prefer-stateless-function": "off",
        "jsx-a11y/href-no-hash": "off"
    }
};