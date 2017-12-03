import React from "react";
import styles from "./Nobt.scss";
import LocationBuilder from "../modules/navigation/LocationBuilder";
import EmptyNobtPlaceholder from "./EmptyNobtPlaceholder";
import { FontIcon } from "react-toolbox/lib/font_icon";
import AddBillFAB from "./AddBillFAB";
import NobtItButtonTheme from "./NobtItButtonTheme.scss";
import { Button, IconButton } from "react-toolbox/lib/button/index";
import HeadRoom from "react-headroom";
import Amount from "../../../components/Amount/Amount";
import BrandedAppBar from "../../../components/BrandedAppBar";
import { List, ListItem, ListSubHeader } from "react-toolbox/lib/list/index";
import { FormattedRelative } from "react-intl";

export default class Nobt extends React.Component {

  render = () => {
    return (
      <div className={styles.nobt}>
        <HeadRoom>
          <BrandedAppBar />

          <div className={styles.overviewContainer}>
            <div className={styles.nobtTitle}>{this.props.name}</div>
            <div className={styles.nobtMetadata}>
              <ul>
                <li>
                  <div><FontIcon value="payment" /><Amount value={this.props.total} /></div>
                </li>
                <li>
                  <div><FontIcon value="group" />{this.props.members.length}</div>
                </li>
              </ul>
            </div>
            {(!this.props.isNobtEmpty) && (
              <Button
                label="Show balances"
                primary
                raised
                onClick={() => LocationBuilder.fromWindow().push("balances").apply(this.props.push)}
                theme={NobtItButtonTheme}
              />)}
          </div>
        </HeadRoom>

        {
          this.props.isNobtEmpty
            ? (<EmptyNobtPlaceholder />)
            : (
              <div>


                <List>
                  <ListSubHeader caption={<FormattedRelative value={new Date()} />} />
                  <ListItem
                    leftIcon="payment"
                    caption="David paid Thomas"
                    legend={<Amount value={30} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />
                  <ListItem
                    leftIcon="payment"
                    caption="Lisa paid Thomas"
                    legend={<Amount value={26} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />
                  <ListItem
                    leftIcon="payment"
                    caption="David paid Sarah"
                    legend={<Amount value={10} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />
                  <ListSubHeader caption={<FormattedRelative value={new Date(2017, 10, 10)} />} />
                  <ListItem
                    leftIcon="receipt"
                    caption="David paid 'Bier'"
                    legend={<Amount value={30} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />
                  <ListSubHeader caption={<FormattedRelative value={new Date(2017, 10, 7)} />} />
                  <ListItem
                    leftIcon="receipt"
                    caption="David paid 'Punsch'"
                    legend={<Amount value={15.50} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />

^^                  <ListItem
                    leftIcon="payment"
                    caption="David paid Sarah"
                    legend={<Amount value={10} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />
                  <ListSubHeader caption={<FormattedRelative value={new Date(2017, 10, 3)} />} />
                  <ListItem
                    leftIcon="receipt"
                    caption="David paid 'Bier'"
                    legend={<Amount value={30} />}
                    rightActions={[
                      <IconButton icon="chevron_right" />
                    ]}
                  />
                </List>


                {
                  this.props.children
                }

              </div>
            )
        }

        <AddBillFAB />
      </div>
    );
  };

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    members: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    bills: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    billFilter: React.PropTypes.string.isRequired,
    billSortProperty: React.PropTypes.string.isRequired,
    isNobtEmpty: React.PropTypes.bool.isRequired,
    createdOn: React.PropTypes.string.isRequired
  };
}
