# Floating action button (FAB)

    class MyFab extends React.Component {

      state = {
        expanded: false
      }

      toggleState = () => this.setState({expanded: !this.state.expanded})

      render = () => (
        <FABMenu expanded={isExpanded(props)}>
          <Overlay onClick={this.toggleState} />
          <Items>
            <Item>
              <Label>First item</Label>
              <Button onClick={() => console.log("First item clicked")} />
            </Item>
            <Item disabled>
              <Label>Second item</Label>
              <Button />
            </Item>
          </Items>
          <MenuButton>
            <Button icon="add" onClick={this.toggleState} />
          </MenuButton>
        </FABMenu>
      )
    }

Per design, the FABMenu works without any internal state. Simply nest all the related components inside of the FABMenu in the way you want. It is important to use the `<Items>` wrapper, otherwise the compound component does not work. `<Button>` is a regular button from `react-toolbox`.
