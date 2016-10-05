import React from "react";
import styles from "./Card.scss";
import { Card } from "react-toolbox/lib/card";

export const CardWithNoShadow = (props) => (<Card className={styles.card}>{props.children}</Card>)

export default CardWithNoShadow
