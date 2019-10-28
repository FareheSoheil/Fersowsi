const zeroTrimmer = function(string) {
  let res = string;
  if (/^[+-]?([0-9]*[.])?[0-9]+$/.test(string)) res = parseFloat(string);
  return res;
};

export default zeroTrimmer;
