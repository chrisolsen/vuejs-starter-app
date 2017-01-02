module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    window: true,
    FileReader: true
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },

  // Check out the following url for rules
  // https://github.com/airbnb/javascript
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],

    // http://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ["error", {
      "anonymous": "ignore",
      "named": "ignore",
      "asyncArrow": "ignore"
    }],

    // http://eslint.org/docs/rules/indent
    // Turn off this rule, code should look good, but if it becomes a serious
    // waster, let it go.
    'indent': 0,

    // http://eslint.org/docs/rules/arrow-parens
    // allow paren-less arrow functions
    'arrow-parens': 0,

    // http://eslint.org/docs/rules/generator-star-spacing
    // allow async-await
    'generator-star-spacing': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // I use windows, so change as needed
    'linebreak-style': ["error", "windows"],

    // http://eslint.org/docs/rules/quotes
    // stop being so pedantic about quotes, they are just #!&$*'n quotes!!
    'quotes': 0,

    'semi': 0,

    'no-param-reassign': 0
  }
}
