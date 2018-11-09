const Vue = require('vue');
const compiler = require('vue-template-compiler');

function createFunction(code) {
  try {
    return new Function(code);
  } catch (e) {
    throw new Error('Could not create a function');
  }
}

module.exports = function compileAndRender(code, modules = []) {
  const { render, staticRenderFns } = compiler.compile(code, { modules });

  const vm = new Vue({
    render: createFunction(render),
    staticRenderFns: staticRenderFns.map(createFunction),
  }).$mount();

  return vm.$el.outerHTML;
};
