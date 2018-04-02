import React from "react";
import styles from "./AddBillFAB.scss";
import { Button } from "react-toolbox/lib/button";
import Link from "../../../../components/nav/Link";

// TODO: Use a real FAB library here that allows to hide the button on scroll
export default () => {
	return (
		<Link to={id => `${id}/bill`}>
			<Button
				icon='add'
				className={styles.button}
				primary
				floating
			/>
		</Link>
	)
};