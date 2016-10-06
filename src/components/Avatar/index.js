import Avatar from "./Avatar";

export const BigAvatar = (props) => (
  <Avatar name={props.name} size={45} />
);

export const SmallAvatar = (props) => (
  <Avatar name={props.name} size={30} />
);

exports.Avatar = Avatar;
exports.BigAvatar = Avatar;
exports.SmallAvatar = Avatar;
