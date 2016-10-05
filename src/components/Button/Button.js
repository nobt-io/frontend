import React from "react";
import { Button } from "react-toolbox/lib/button";

export const Btn = (props) => (
  <Button target='_blank' icon={props.icon} onClick={props.onClick} disabled={props.disabled}>{props.children}</Button>
);

export default Btn
