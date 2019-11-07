const labels = ['price', 'discount', 'totalPrice', 'totalCost'];

const zeroTrimmer = function(string, label) {
  console.log('zero trimmer labels : ', label);
  let res = string;
  if (/^[+-]?([0-9]*[.])?[0-9]+$/.test(string)) {
    if (labels.includes(label)) res = parseFloat(string) + ' $';
    else res = parseFloat(string);
  }

  return res;
};

export default zeroTrimmer;
