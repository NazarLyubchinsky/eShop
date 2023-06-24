import React from "react";
import { useState } from "react";
import s from "./CardProduct.module.scss";
import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "../Product/AddToCardButton/AddToCardButton";
import Popup from "../Product/Popup/Popup";

// img
import tick from "../../assets/img/done.png";

const CardProduct = ({ product }) => {
	const [showPopup, setShowPopup] = useState(false);

	const handleCart = () => {
		const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
		const foundCartItem = storedCartItems.find((item) => item.id === product.id);

		if (foundCartItem) {
			foundCartItem.quantity += 1;
		} else {
			storedCartItems.push({ ...product, quantity: 1 });
		}

		localStorage.setItem("cartItems", JSON.stringify(storedCartItems));

		// Show the popup
		setShowPopup(true);
	};

	return (

		<div className={s.card}>
			<div className={s.card__product}>
				<Link
					product={product}
					style={{ textDecoration: "none", color: "#000" }}
					href={`/products/${product.id}?category=${product.category}`}>
					<img
						className={s.card__product_img}
						src={product.image}
						alt={product.title}
					/>
					<h3 className={s.card__title}>{product.title}</h3>
					<p className={s.card__price}>{product.price} USD</p>
				</Link>
			</div>
			<AddToCartButton onClick={handleCart} />
			{showPopup && (
				<Popup
					onClose={() => setShowPopup(false)}
					image={<Image src={tick} alt="tick" width={50} height={50} />}
					text="Item in cart"
				/>
			)}
		</div>
	);
};

export default CardProduct;







