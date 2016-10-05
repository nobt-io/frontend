import format from 'format-number';

class CurrencyFormatter{

  constructor(currencyKey){
    const currencyFormatLookup = {
      'EUR': {prefix: '€', suffix: ''},
      'GBR': {prefix: '£', suffix: ''}
    };

    this.currencyFormat = format(currencyFormatLookup[currencyKey]);
  }

  getCurrencyAmount(amount){
    return this.currencyFormat(amount, {noSeparator: true});
  }
}

export default CurrencyFormatter;
