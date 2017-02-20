import React from "react";
import {Avatar} from "./Avatar"

const avatarFactory = (name, size) => (<Avatar key={name} name={name} size={size} fontSize={size / 2} />);

export default avatarFactory;
