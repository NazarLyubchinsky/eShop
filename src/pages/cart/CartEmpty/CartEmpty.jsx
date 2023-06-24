import React from "react";
import s from "./CartEmpty.module.scss";
import Link from "next/link";

const CartEmpty = () => {
	return (
		<div className={s.empty}>
			<p className={s.empty__cart}>
			Sorry, you haven't added anything to your cart yet
			</p>
			<button className={s.empty__btn}>
				<Link href="/products">Go to catalog</Link>
			</button>
		</div>
	);
};

export default CartEmpty;
