module.exports = function removeDataAttrModule(options = {}) {
  const {
    condition = () => process.env.NODE_ENV === 'production',
    onlyExactAttrName = true,
    attrNameSuffix = 'test',
  } = options;

  const attrName = `data-${attrNameSuffix}`;

  return {
    preTransformNode({ tag, attrsMap, attrsList }) {
      if (typeof condition === 'function' && condition({ tag, attrs: attrsMap })) {
        attrsList
          .reduce((attrs, { name }, index) => (
            (onlyExactAttrName ? name === attrName : name.startsWith(attrName))
              ? attrs.concat({ index, name })
              : attrs
          ), [])
          .reverse()
          .forEach(({ name, index }) => {
            delete attrsMap[name];
            attrsList.splice(index, 1);
          });
      }
    },
  };
};
