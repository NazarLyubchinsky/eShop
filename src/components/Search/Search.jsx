import React, { useState, useEffect, useRef } from "react";
import s from "./Search.module.scss";

import Link from "next/link";
import { AiOutlineClose } from 'react-icons/ai'
import debounce from 'lodash.debounce';


const Search = () => {
	const [searchInfo, setSearchInfo] = useState("");
	const [products, setProducts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const inputRef = useRef(null);

	const handleSearch = async () => {
		try {
			const productsFetch = await fetch('https://fakestoreapi.com/products');
			const productsData = await productsFetch.json();
			const filteredProducts = productsData.filter((product) =>
				product.title.toLowerCase().includes(searchInfo.toLowerCase())
			);
			// Data filtering
			setProducts(filteredProducts);
			setShowResults(true);

			// Cursor pack input active
			inputRef.current.focus();
		} catch (error) {

		}
	};

	const debouncedHandleSearch = debounce(handleSearch, 1000);

	useEffect(() => {
		if (searchInfo.length > 0) {
			debouncedHandleSearch();
		} else {
			setShowResults(false);
			setProducts([]);
		}
	}, [searchInfo]);


	return (
		<div className={s.search}>
			<input type="text" placeholder="Search" value={searchInfo} ref={inputRef} onChange={(e) => {
				setSearchInfo(e.target.value);
				debouncedHandleSearch();
			}} />
			<button className={s.search__btn} type="submit" onClick={handleSearch}>
				Search
			</button>
			{showResults && (
				<div className={s.results}>
					<div>
						<button onClick={() => { setShowResults(false); setSearchInfo(""); }} className={s.results__close}>
							<AiOutlineClose size={25} />
						</button>
					</div>
					{products.length ? (
						products.map((product) => (
							<Link className={s.link} style={{ color: "#000", }} href={`/products/${product.id}?category=${product.category}`}
								onClick={() => { setShowResults(false); setSearchInfo(""); }}>
								<div className={s.product}
									key={product.id}>
									<img className={s.product__img} src={product.image} alt={product.title} />
									<div>
										<h5>{product.title}</h5>
										<p>{product.price} USD </p>
									</div>
								</div>
							</Link>
						))
					) : (<p style={{ color: "red", fontSize: "24px", textAlign: "center" }}>This product is no longer in stock</p>)}
				</div>
			)}
		</div>
	);
};

export default Search;
