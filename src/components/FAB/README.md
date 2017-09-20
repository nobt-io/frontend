# Floating action button (FAB)

    class MyFab extends React.Component {

      state = {
        expanded: false
      }

      toggleState = () => this.setState({expanded: !this.state.expanded})

      render = () => (
      <FAB expanded={this.state.expanded} buttonProps={{
        onClick: this.toggleState
      }}>
        <Item
          label="First item"
          buttonProps={{
            onClick: () => console.log("First item clicked!")
          }}
        />
        <Item
          disabled
          label="Second item"
          buttonProps={{
            onClick: () => console.log("Second item clicked!")
          }}
        />
      </FAB>)
    }

Per design, the FAB works without any internal state. The `FAB`-Api consists of the `expanded` and `buttonProps` properties which can be used to control the internal behaviour.
`Item` is designed to be nested inside the `FAB` component and allows to add entries to the FAB-menu.
