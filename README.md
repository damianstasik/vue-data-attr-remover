<h1 align="center">vue-data-attr-remover</h1>
<p align="center">Vue compiler module that allows you to easily remove <code>data-*</code> attributes</p>

## Instalation
``` bash
npm i -D vue-data-attr-remover

yarn add --dev vue-data-attr-remover
```

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

## API

| Name                | Type       | Default value                                 |
|---------------------|------------|-----------------------------------------------|
| `condition`         | `Function` | `() => process.env.NODE_ENV === 'production'` |
| `onlyExactAttrName` | `Boolean`  | `true`                                        |
| `attrNameSuffix`    | `String`   | `'test'`                                      |
