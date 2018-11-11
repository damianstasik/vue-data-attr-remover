## Usage
### `vue.config.js`
```js
const dataAttrRemover = require('vue-data-attr-remover');

module.exports = {
  chainWebpack(config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        const { compilerOptions } = options;
        const { modules = [] } = compilerOptions;

        modules.push(dataAttrRemover());

        compilerOptions.modules = modules;
        options.compilerOptions = compilerOptions;

        return options;
      });
  }
};

```

### `webpack.config.js`
```js
const dataAttrRemover = require('vue-data-attr-remover');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            modules: [
              dataAttrRemover(),
            ],
          },
        },
      },
    ],
  },
};
```
