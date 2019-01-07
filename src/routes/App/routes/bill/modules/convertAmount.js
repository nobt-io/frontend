import debug from "debug";

export default (amount, rate) => {

	if (isNaN(amount)) {
		throw new Error("amount is not a number")
	}

	if (isNaN(rate)) {

		debug("getConvertedAmount")(`rate ${rate} is NaN!`);

		return amount;
	}

	const result = 1 / rate * amount;

	if (!isFinite(result)) {
		return "";
	}

	return result.toFixed(2)
}