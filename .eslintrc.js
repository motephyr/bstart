module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-useless-call': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'semi': 'off',
    'no-useless-escape': 'off',
    'comma-spacing': 'off',
    'space-infix-ops': 'off',
    'semi-spacing': 'off',
    'no-undef': 'off',
    'brace-style': 'off',
    'space-before-blocks': 'off',
    'block-spacing': 'off',
    'no-sequences': 'off',
    'quotes': 'off',
    'no-unused-vars': 'off',
    'indent': 'off',
    'no-return-assign': 'off',
    'no-unneeded-ternary': 'off'
  },
  globals: {}
}
