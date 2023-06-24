import React from "react";
import s from "./Header.module.scss";
import Link from "next/link";

import Search from "@/components/Search/Search";
import Order from "@/components/Order/Order";




import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'



const header = ({ props }) => {
	const [nav, setNav] = useState(false);

	// mobile close
	const closeNav = () => {
		setNav(false);
	};

	return (
		<>
			<header className={s.header}>
				<div className={s.header__wrapper}>
					<div className={s.header__wrapper_logo}>
						<Link onClick={closeNav} className={s.header__logo} href="/">
							eShop
						</Link>
					</div>
					<div className={[s.header__wrapper_search, s.wrapper_search].join(" ")}>
						<Search props={props} />
					</div>
					<nav>
						<ul className={nav ? [s.header__wrapper_nav, s.active].join(' ') : [s.header__wrapper_nav]}>
							<li>
								<Link onClick={closeNav} href="/products"> Catalog </Link>
							</li>
							<li>
								<Link onClick={closeNav} href="/payment"> Payment </Link>
							</li>
							<li>
								<Link onClick={closeNav} href="/delivery"> Delivery </Link>
							</li>
						</ul>
					</nav>

					<div className={s.header__wrapper_cart}>
						<Order />
						{/*  */}

						{/*  */}
					</div>
					<div onClick={() => setNav(!nav)} className={s.mobile__btn}>
						{nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
					</div>
				</div>
			</header>
		</>
	);
};

export default header;
