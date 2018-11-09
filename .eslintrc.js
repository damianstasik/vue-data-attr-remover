module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  rules: {
    'no-new-func': 'off',
    'no-param-reassign': ['error', {
      props: false,
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/test/*.js'],
    }],
  },
};
