module.exports = {
  extends: [
    // For some ci and jest test env, we chose require.resolve instead 'plugin:@iceworks/best-practices/react-ts'
    require.resolve('@iceworks/eslint-plugin-best-practices/src/configs/react-ts'),
    // 解决eslint和prettier冲突问题
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-useless-escape': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@iceworks/best-practices/no-js-in-ts-project': 'off',
    'react/no-danger': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@iceworks/best-practices/recommend-functional-component': 'off',
    'max-len': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-bitwise': 'off',
    'no-mixed-operators': 'off',
    '@typescript-eslint/no-require-imports': 'off',
  },
};
