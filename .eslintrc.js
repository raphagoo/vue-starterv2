module.exports = {
    root: true,
    // "parser": "babel-eslint",
    "env": {
        // "browser": true,
        "node": true
    },
    // "globals": {
    //     "module": true
    // },
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        // '@vue/standard',
    ],
}
