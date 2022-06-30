export function realMask(value) {
  let maskedValue = value;

  maskedValue = maskedValue.replace(/\D/g, "").replace(/([0-9]{2})$/g, ",$1");

  if (maskedValue.length === 1) {
    maskedValue = maskedValue.replace(/([0-9])$/g, ",0$1");
  }

  if (maskedValue.startsWith(",")) {
    maskedValue = maskedValue.replace(/^,/, "0,");
  }

  if (maskedValue.startsWith("0") && maskedValue.length > 4) {
    maskedValue = maskedValue.replace(/^0/, "");
  }

  if (maskedValue > 6) {
    maskedValue = maskedValue.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  return maskedValue;
}
