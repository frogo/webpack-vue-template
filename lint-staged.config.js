module.exports = {
  linters: {
    '*.{js,vue}': ['eslint --fix', 'git add'],
    '*.{vue,htm,html,css,sss,less,scss,sass}': ['stylelint --fix', 'git add']
  },
  ignore: ['*.min.{js,css}']
}
