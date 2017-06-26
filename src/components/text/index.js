import * as React from "react";
import styles from "./text.scss"

const Title = (props) => <h3 className={styles.title}>{props.children}</h3>;
const SubTitle = (props) => <p className={styles.subTitle}>{props.children}</p>;

exports.Title = Title;
exports.SubTitle = SubTitle;
