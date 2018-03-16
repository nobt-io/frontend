import theme from "./ConfirmationDialog.scss"
import React from "react";
import { Dialog } from "react-toolbox/lib/dialog/index";

export default ({active, title, confirm, cancel, children}) => (<Dialog
  active={active}
  title={title}
  theme={theme}
  onEscKeyDown={cancel}
  onOverlayClick={cancel}
  actions={[
    {label: "Yes", onClick: confirm, primary: true, raised: true},
    {label: "No", onClick: cancel}
  ]}>
  {children}
</Dialog>)
