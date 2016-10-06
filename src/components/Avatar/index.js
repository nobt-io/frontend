import React from "react";
import Avatar from "./Avatar";

export const BigAvatar = (props) => (
  <Avatar name={props.name} size={45} fontSize={25}/>
);

export const SmallAvatar = (props) => (
  <Avatar name={props.name} size={30} />
);

exports.Avatar = Avatar;
exports.BigAvatar = BigAvatar;
exports.SmallAvatar = SmallAvatar;
