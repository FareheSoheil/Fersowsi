const arrayResolver = function(array, value, labels) {
  const l1 = array.length;
  const l2 = labels.length;
  let resolvedArray = [];
  for (let i = 0; i < l1; i++) {
    let finalLabel = '';
    for (let j = 0; j < l2; j++) {
      finalLabel += array[i][labels[j]] + ' ';
    }
    resolvedArray.push({
      value: array[i][value],
      label: finalLabel,
    });
  }
  return resolvedArray;
};

export default arrayResolver;
