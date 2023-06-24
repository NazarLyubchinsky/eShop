
import React, { useState, useEffect } from "react";
import s from "./cart.module.scss";

import CartItems from "./CartItems/CartItems";
import CartEmpty from "./cartEmpty/CartEmpty";

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const storedItems = localStorage.getItem("cartItems");
		if (storedItems) {
			setCartItems(JSON.parse(storedItems));
		}
	}, []);

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className={s.cart}>
							<h1 className={s.text__center}>Cart of orders</h1>
							{cartItems.length === 0 ? (
								<CartEmpty />
							) : (
								<div>
									<p>Number of items in cart: {cartItems.length}</p>
									<CartItems cartItems={cartItems} setCartItems={setCartItems} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;




