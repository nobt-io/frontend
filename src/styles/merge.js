require("../utils/aggregate");

export default function merge(...themes) {
  return themes.aggregate( (existingValue, newValue) => `${existingValue} ${newValue}` )
}
