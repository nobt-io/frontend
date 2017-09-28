import React from "react";
import Avatar from "./Avatar"

const avatarFactory = (name, size) => (<Avatar key={name} name={name} medium/>);

export default avatarFactory;
