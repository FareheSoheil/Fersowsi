const dateTrimmer = function(dateString) {
  var newDateString = new Date(dateString).toUTCString();
  newDateString = newDateString
    .split(' ')
    .slice(0, 4)
    .join(' ');
  return newDateString;
};
export default dateTrimmer;
