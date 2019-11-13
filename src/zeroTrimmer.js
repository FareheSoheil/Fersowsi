const labels = ['price', 'discount', 'totalPrice', 'totalCost'];
const priceSigns = ['€', '$', '£', 'ریال', 'SEK'];
const zeroTrimmer = function(string, label) {
  const sign = priceSigns[parseInt(localStorage.getItem('currency'))];
  let res = string;
  if (string == undefined) res = ``;
  else if (/^[+-]?([0-9]*[.])?[0-9]+$/.test(string)) {
    if (labels.includes(label))
      res = `${parseFloat(string).toFixed(1)} ${sign}`;
    else res = parseFloat(string);
  }

  return res;
};

export default zeroTrimmer;
