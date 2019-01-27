import React from 'react';
import Header from './components/Header/Header';
import BillInput from './components/BillInput/BIllInput';
import HeaderTitle from './components/Header/HeaderTitle';
import AppFrame from './components/AppFrame/AppFrame';
import AppBar from './components/AppBar/AppBar';
import { RouteComponentProps } from 'react-router';
import BillSplitting from './components/BillSplitting/BillSplitting';
import ActionButton from './components/ActionButton/ActionButton';
import { Section } from '../../../../components/Section';

interface State {
  title: string | null;
  amount: string | null;
}

class Bill extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps, context?: any) {
    super(props, context);

    this.state = {
      title: null,
      amount: null,
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
  }

  public render() {
    return (
      <AppFrame primary>
        <AppBar history={this.props.history} />
        <Header>
          <HeaderTitle>Add a bill</HeaderTitle>
        </Header>
        <BillInput
          label="What did you buy?"
          placeholder="Trip Snacks, Train Tickets, ..."
          onChange={this.updateAmount}
          value={this.state.amount}
        />
        <BillInput
          label="How much did it cost?"
          placeholder="0.00"
          onChange={this.updateTitle}
          value={this.state.title}
          currency
        />
        <BillSplitting />
        <div style={{textAlign: "center"}}>
          <ActionButton icon={'done'}>Add this bill</ActionButton>
        </div>
      </AppFrame>
    );
  }

  private updateTitle(title: string) {
    this.setState({ ...this.state, title });
  }

  private updateAmount(amount: string) {
    this.setState({ ...this.state, amount });
  }
}

export default Bill;
