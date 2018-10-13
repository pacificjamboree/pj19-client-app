export default (keysMap, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    if (keysMap.hasOwnProperty(key.trim())) {
      const renamedObject = {
        [keysMap[key.trim()] || key.trim()]: obj[key],
      };
      return {
        ...acc,
        ...renamedObject,
      };
    } else {
      return { ...acc };
    }
  }, {});
