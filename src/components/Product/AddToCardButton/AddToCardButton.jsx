import React from "react";
import s from "../AddToCardButton/AddToCardButton.module.scss";

const AddToCartButton = ({ onClick }) => {
	return (
		<button className={s.card__basket_btn} onClick={onClick}>
			Add to Cart
		</button>
	);
};

export default AddToCartButton;
