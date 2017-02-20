import React from "react";
import Avatar from "./Avatar";
import AvatarSize from "./avatarSize"
import AvatarList from "./AvatarList/AvatarList"
import avatarFactory from "./avatarFactory"

export const BigAvatar = (props) => avatarFactory(props.name, AvatarSize.BIG);
export const MediumAvatar = (props) => avatarFactory(props.name, AvatarSize.MEDIUM);
export const SmallAvatar = (props) => avatarFactory(props.name, AvatarSize.SMALL);

exports.Avatar = Avatar;
exports.BigAvatar = BigAvatar;
exports.MediumAvatar = MediumAvatar;
exports.SmallAvatar = SmallAvatar;
exports.AvatarList = AvatarList;
exports.AvatarSize = AvatarSize;
exports.avatarFactory = avatarFactory;

var sizedAvatarPropTypes = {
  name: React.PropTypes.string.isRequired
};

BigAvatar.propTypes = sizedAvatarPropTypes;
MediumAvatar.propTypes = sizedAvatarPropTypes;
SmallAvatar.propTypes = sizedAvatarPropTypes;
