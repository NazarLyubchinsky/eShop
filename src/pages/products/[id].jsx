
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from 'react-bootstrap/Spinner';
import CardProduct from "@/components/Product/CardProduct";


import s from "./ProductDetails.module.scss";

// img
import Image from "next/image";
import tick from "../../assets/img/done.png";

const ProductDetails = () => {
	const router = useRouter();
	const { id } = router.query;

	const [product, setProduct] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
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
		setShowPopup(true);
	};

	useEffect(() => {
		const fetchSelectedProduct = async () => {
			const response = await fetch(`https://fakestoreapi.com/products/${id}`);
			const data = await response.json();
			setProduct(data);

			const relatedResponse = await fetch(
				`https://fakestoreapi.com/products/category/${data.category}`
			);
			const relatedData = await relatedResponse.json();
			const filteredProducts = relatedData.filter((p) => p.id !== data.id);
			setRelatedProducts(filteredProducts.slice(0, 4));
		};

		if (id) {
			fetchSelectedProduct();
		}
	}, [id]);

	if (!product) {
		return (
			<div>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	return (
		<div >
			<div className={s.container__product}>
				<div className="row">
					<div className={s.product__wrapper}>
						<div className={s.product__img}>
							<img src={product.image} alt="" />
						</div>
						<div className={s.about}>
							<h3 className={s.about__title}>{product.title}</h3>
							<h3 className={s.price}>{product.price} USD</h3>
							<button onClick={handleCart} className={s.buy}>Add to Cart</button>
						</div>
					</div>
					{showPopup && (
						<>
							<div className={s.popup__background} onClick={() => setShowPopup(false)} />
							<div className={s.popup__main}>
								<Image src={tick} alt="tick" width={50} height={50} />
								<p>Item in cart</p>
								<button className={s.popup__main_close} onClick={() => setShowPopup(false)}>
									Close
								</button>
							</div>
						</>
					)}
				</div>
				<div className="row m-5">
					<div className="col-12">
						<div className="category">
							<h3 className="category__title">More products of the same category</h3>
							<div className="row">
								{relatedProducts.map((p) => (
									<div className="col-md-4 col-sm-6" key={p.id}>
										<CardProduct product={p} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
