module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    'no-console': 2 // 如果有console，会抛出错误
  }
};
