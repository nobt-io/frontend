import * as React from "react";
import Amount from "../../../../components/Amount/Amount";
import FeedItem from "./FeedItem";
import Link from "../../../../components/nav/Link";

export default ({feedItem}) => {

	const {id: billId, debtee, subject, amount} = feedItem;

	return (
		<Link to={nobtId => `/${nobtId}/${billId}`}>
			<FeedItem
				icon="receipt"
				caption={`${debtee} paid '${subject}'`}
				legend={<Amount value={amount} />}
			/>
		</Link>
	)
};