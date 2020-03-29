module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard',
    'canonical-jsdoc'
  ],
  rules: {
    'no-console':  process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    // 属性超过3个开始需要换行
    "vue/max-attributes-per-line": ["error", {
      "singleline": 100,
      "multiline": {
        "max": 100,
        "allowFirstLine": false
      }
    }]
  },
  env: {
    browser: true,
    es6: true
  }
}
