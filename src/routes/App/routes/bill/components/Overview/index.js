import React from "react";
import { AppBar } from "react-toolbox/lib/app_bar/index";
import HeadRoom from "react-headroom";
import { FontIcon } from "react-toolbox/lib/font_icon/index";
import { SubTitle, Title } from "components/text/index";
import Page from "components/Page";
import { Input } from "react-toolbox/lib/input/index";
import { List, ListItem } from "react-toolbox/lib/list/index";
import Box from "../../../../../../components/Box/Box";
import LocationBuilder from "../../../../modules/navigation/LocationBuilder";
import withNavigation from "../../../../../../components/hoc/withNavigation";

const overview = ({push}) => (
  <div>

    <HeadRoom>
      <AppBar
        leftIcon={<FontIcon value="chevron_left" />}
        rightIcon={<FontIcon />}
        title="Add Bill"
      />
    </HeadRoom>

    <Page>
      <Title>Subject</Title>
      <SubTitle>Enter a descriptive name for what was paid.</SubTitle>
      <Box><Input placeholder="Trip Snacks, Train Tickets, Beer, ..." /></Box>

      <Title>Total</Title>
      <SubTitle>Enter the total of this bill.</SubTitle>
      <Box><Input placeholder="13.37" type="number" /></Box>

      <Title>Debtee</Title>
      <SubTitle>Select the person who paid this bill.</SubTitle>
      <Box>
        <List selectable>
          <ListItem
            leftIcon="person"
            caption="David"
            onClick={() => LocationBuilder.fromWindow().push("debtee").apply(push)}
            legend="€ 20"
            rightActions={[
              <FontIcon value="edit" />
            ]} />
        </List>
      </Box>

      <Title>Debtors</Title>
      <SubTitle>Select who is involved in this bill.</SubTitle>

      <Box>
        <List selectable>
          <ListItem
            leftIcon="group"
            caption="David, Thomas, Martin, ..."
            legend="5 persons"
            rightActions={[
              <FontIcon value="edit" />
            ]} />
        </List>
      </Box>

    </Page>

  </div>
);

export default withNavigation(overview);
