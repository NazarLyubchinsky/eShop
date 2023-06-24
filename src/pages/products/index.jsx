

// import React, { useState, useMemo } from "react";
// import CardProduct from "@/components/Product/CardProduct";
// import classNames from "classnames";
// import s from './index.module.scss';

// const Index = ({ products, categories }) => {
// 	const [selectedCategory, setSelectedCategory] = useState("All");
// 	const [searchTerm, setSearchTerm] = useState("");

// 	const filteredProducts = useMemo(() => {
// 		if (selectedCategory === "All") {
// 			return products.filter((product) =>
// 				product.title.toLowerCase().includes(searchTerm.toLowerCase())
// 			);
// 		} else {
// 			return products.filter(
// 				(product) =>
// 					product.category === selectedCategory &&
// 					product.title.toLowerCase().includes(searchTerm.toLowerCase())
// 			);
// 		}
// 	}, [products, selectedCategory, searchTerm]);

// 	const handleSearchInputChange = (event) => {
// 		setSearchTerm(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<div className={s.search__product}>
// 				<input className={s.search__product_input} type="text" placeholder="Search products..." value={searchTerm} onChange={handleSearchInputChange} />
// 			</div>
// 			<div className="container-fluid mx">
// 				<div className="row m-5 mx-2 flex-sm-row flex-column">
// 					<div className="col-sm-3">
// 						<ul className={s.item}>
// 							Products by category
// 							<div className={s.line}></div>
// 							<li
// 								className={classNames(s.list, {
// 									[s.selected]: selectedCategory === "All",
// 								})}
// 								onClick={() => setSelectedCategory("All")}
// 							>
// 								All Products
// 							</li>
// 							{categories.map((category) => (
// 								<li
// 									key={category}
// 									className={classNames(s.list, {
// 										[s.selected]: selectedCategory === category,
// 									})}
// 									onClick={() => setSelectedCategory(category)}
// 								>
// 									{category}
// 								</li>
// 							))}
// 						</ul>
// 					</div>
// 					<div className="col-sm-9">
// 						<h3 className={s.title}>
// 							{`${selectedCategory.charAt(0).toUpperCase() +
// 								selectedCategory.slice(1)} Products`}
// 						</h3>
// 						<div id={s.product__content} className="d-flex flex-sm-wrap">
// 							{filteredProducts.length > 0 ? (
// 								filteredProducts.map((product) => (
// 									<div className={s.product__wrap} key={product.id}>
// 										<CardProduct product={product} />
// 									</div>
// 								))
// 							) : (
// 								<p>No products found.</p>
// 							)}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export async function getStaticProps() {
// 	const res = await fetch("https://fakestoreapi.com/products");
// 	const products = await res.json();

// 	const categories = Array.from(new Set(products.map((p) => p.category)));

// 	return {
// 		props: {
// 			products,
// 			categories,
// 		},
// 	};
// }

// export default Index;















import React, { useState, useMemo } from "react";
import CardProduct from "@/components/Product/CardProduct";
import classNames from "classnames";
import s from './index.module.scss';

const Index = ({ products, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(9);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return products.filter(
        (product) =>
          product.category === selectedCategory &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [products, selectedCategory, searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 9);
  };

  return (
    <div>
      <div className={s.search__product}>
        <input
          className={s.search__product_input}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      <div className="container-fluid mx">
        <div className="row m-5 mx-2 flex-sm-row flex-column">
          <div className="col-sm-3">
            <ul className={s.item}>
              Products by category
              <div className={s.line}></div>
              <li
                className={classNames(s.list, {
                  [s.selected]: selectedCategory === "All",
                })}
                onClick={() => setSelectedCategory("All")}
              >
                All Products
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  className={classNames(s.list, {
                    [s.selected]: selectedCategory === category,
                  })}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-9">
            <h3 className={s.title}>
              {`${selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)} Products`}
            </h3>
            <div id={s.product__content} className="d-flex flex-sm-wrap">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, visibleProducts).map((product) => (
                  <div className={s.product__wrap} key={product.id}>
                    <CardProduct product={product} />
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
            {filteredProducts.length > visibleProducts && (
        <div className={s.more__Button}>
			      <button  onClick={handleLoadMore}>
                Load More
              </button>
		  </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return {
    props: {
      products,
      categories,
    },
  };
}

export default Index;


