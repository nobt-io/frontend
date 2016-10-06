import React from "react";
import Avatar from "./Avatar";

export const BigAvatar = (props) => (
  <Avatar name={props.name} size={45} fontSize={22} />
);

export const MediumAvatar = (props) => (
  <Avatar name={props.name} size={30} />
);

export const SmallAvatar = (props) => (
  <Avatar name={props.name} size={22} fontSize={11} />
);

exports.Avatar = Avatar;
exports.BigAvatar = BigAvatar;
exports.MediumAvatar = MediumAvatar;
exports.SmallAvatar = SmallAvatar;

var sizedAvatarPropTypes = {
  name: React.PropTypes.string.isRequired
};

BigAvatar.propTypes = sizedAvatarPropTypes;
MediumAvatar.propTypes = sizedAvatarPropTypes;
SmallAvatar.propTypes = sizedAvatarPropTypes;
