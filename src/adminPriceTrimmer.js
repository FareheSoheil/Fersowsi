const labels = ['price', 'totalPrice', 'totalCost'];
const priceSigns = ['€', '$', '£', 'ریال', 'SEK'];
const adminPriceTrimmer = function(string, label) {
  let res = string;
  if (string == undefined) res = ``;
  else if (/^[+-]?([0-9]*[.])?[0-9]+$/.test(string)) {
    if (labels.includes(label)) res = `${parseFloat(string).toFixed(1)}`;
    else res = parseFloat(string);
  }

  return res;
};

export default adminPriceTrimmer;
