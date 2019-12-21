const nullFillerHelper = function process(obj) {
  for (var i in obj) {
    var child = obj[i];
    if (child === null || child === undefined) obj[i] = '';
    else if (typeof child == 'object') process(child);
  }
};
export { nullFillerHelper };
