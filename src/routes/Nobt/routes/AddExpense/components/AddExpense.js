import React from "react";
import { Button } from "react-toolbox/lib/button";
import Header from "components/Header";
import styles from "./AddExpense.scss";
import { List, ListSubHeader, ListCheckbox } from "react-toolbox/lib/list";
import Input from "react-toolbox/lib/input";
import { initialState } from "../modules/AddExpense";
import SingleInputInlineForm from "components/SingleInputInlineForm";

export const AddExpense = React.createClass({

  componentWillMount(){
    this.props.loadNobt(this.props.params.id);
  },

  getInitialState() {
    return initialState
  },

  addExpense() {

  },

  // TODO add author credit for icon
  render: function () {

    const addExpenseDisabled = false;

    var members = this.props.members.map(name => {
      return <ListCheckbox
        key={name}
        caption={name}
        checked={ this.props.isChecked(name) }
        onChange={ () => this.props.togglePerson(name) }
      />
    });

    return (
      <div className={styles.AddExpense}>
        <Header showButton={true}>
          <Button className={styles.button} disabled={addExpenseDisabled} icon="add" onClick={this.addExpense}>Add
            to {this.props.nobtName}</Button>
        </Header>
        <section>
          <Input autoComplete="off" type="text" placeholder="What was bought?"/>
          <img className={styles.receiptIcon} src="/receipt.svg"/>
          <Input className={styles.amountInput} type="number" placeholder="0.00" icon='euro_symbol'/>
          <List selectable>
            <ListSubHeader caption='Who is in?'/>
            {members}
          </List>
          <SingleInputInlineForm
            buttonIcon="add_circle_outline"
            placeholder="Anyone else?"
            onSubmit={this.props.addPerson}
            isButtonDisabled={this.props.personExists}
          />
        </section>
      </div>
    );
  }
});

export default AddExpense
