class PersonDebtSummaryFactory {

  constructor(transactions, personSummaryFactor) {
    this.transactions = transactions;
    this.personSummaryFactor = personSummaryFactor;
  }

  computeSummaryForPerson(person) {

    var summaries = this.transactions
      .filter(tx => {
        return tx.debtee === person || tx.debtor === person;
      }).map(tx => {
        if (tx.debtor === person) {
          return {
            debtee: tx.debtee,
            amount: tx.amount * (-1),
            debtor: tx.debtor
          };
        } else {
          return tx;
        }
      }).map(tx => {
        if (tx.debtee === person) {
          return {name: tx.debtor, amount: tx.amount};
        } else {
          return {name: tx.debtee, amount: tx.amount};
        }
      });

    var total = summaries.reduce((sum, tx) => sum + tx.amount, 0);

    return {
      me: this.personSummaryFactor.cratePersonSummary({name: person, amount: total}),
      persons: summaries.map(s => this.personSummaryFactor.cratePersonSummary(s))
    };
  }
}

export default PersonDebtSummaryFactory
