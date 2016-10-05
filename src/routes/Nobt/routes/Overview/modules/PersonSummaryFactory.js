class PersonSummaryFactory {

  constructor(currencyFormatter) {
    this.currencyFormatter = currencyFormatter;
  }

  createExpensePerson(share) {
    const person = {name: share.debtor, amount: share.amount};
    return this.cratePersonSummary(person);
  }

  createTransactionPerson(person) {
    return this.cratePersonSummary(person);
  }

  cratePersonSummary(person){
    const isPositive = person.amount > 0;
    const raw = person.amount;
    const amount = this.currencyFormatter.getCurrencyAmount(Math.abs(person.amount));
    const name = person.name;

    return {isPositive, raw, amount, name };
  }
}

export default PersonSummaryFactory;
