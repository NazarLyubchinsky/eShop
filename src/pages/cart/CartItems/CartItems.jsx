
import s from "./CartItems.module.scss";
import Link from "next/link";


const CartItems = ({ cartItems, setCartItems, products }) => {
	const handleRemoveItem = (itemId) => {
		const updatedItems = cartItems.filter((item) => item.id !== itemId);
		saveCartItems(updatedItems);
	};

	const handleIncrement = (itemId) => {
		const updatedItems = cartItems.map((item) => {
			if (item.id === itemId) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}
			return item;
		});
		saveCartItems(updatedItems);
	};

	const handleDecrement = (itemId) => {
		const updatedItems = cartItems.map((item) => {
			if (item.id === itemId && item.quantity > 1) {
				return {
					...item,
					quantity: item.quantity - 1,
				};
			}
			return item;
		});
		saveCartItems(updatedItems);
	};

	const saveCartItems = (items) => {
		localStorage.setItem("cartItems", JSON.stringify(items));
		setCartItems(items);
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		cartItems.forEach((item) => {
			totalPrice += item.price * item.quantity;
		});
		return totalPrice.toFixed(2);
	};

	return (
		<div className={s.cart__items}>
			<ul className={s.cart__items_item}>
				{cartItems.map((item) => (
					<li className={s.cart__items_list} key={item.id}>
						<Link href={`/products/${item.id}?category=${item.category}`}>
							<div className={s.list__content}>
								<img className={s.list__img} src={item.image} alt={item.title} />
								<p>{item.title}</p>
							</div>
						</Link>
						<div className={s.list__сounter}>
							<button className={s.list__сounter_btn} onClick={() => handleIncrement(item.id)}>+</button>
							<span>{item.quantity}</span>
							<button className={s.list__сounter_btn} onClick={() => handleDecrement(item.id)}>-</button>
						</div>
						<p style={{ color: "green" }}>{item.price * item.quantity} USD</p>
						<button className={s.remove__btn} onClick={() => handleRemoveItem(item.id)}>
							&#10005;
						</button>
					</li>
				))}
			</ul>
			<p>Total Price: {calculateTotalPrice()} USD</p>
			<button className={s.empty__btn}>
				<Link href="/payment">Checkout</Link>
			</button>
		</div>
	);
};

export default CartItems;













