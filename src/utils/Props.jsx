export async function getStaticProps() {
	const res = await fetch("https://fakestoreapi.com/products");
	const products = await res.json();

	const categories = Array.from(new Set(products.map((p) => p.category)));

	return {
		props: {
			products,
			categories
		},
	};
}