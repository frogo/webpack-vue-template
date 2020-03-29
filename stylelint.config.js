module.exports = {
  extends: [
    'stylelint-config-recommended-scss'
  ],
  rules: {
    'selector-pseudo-element-no-unknown': [ true, {
      ignorePseudoElements: ['v-deep']
    } ],
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null
  }
}
