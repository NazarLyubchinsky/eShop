import CardProduct from "@/components/Product/CardProduct";
import Slider from "@/components/Slider/Slider";
import s from "./index.module.scss"



import { Swiper, SwiperSlide } from "swiper/react";




export default function Home({ products }) {

	return (
		<>
			<div className='container'>
				<div className="row">
					<div className="col-12">
						<Slider />

						<ul className={s.product__list} >
							{products && products.map((product) => (
							<li className={s.product__item}>
									<CardProduct product={product} />
							</li>
							))}
						</ul>


					</div>
				</div>
			</div>

		</>
	);
}


export async function getStaticProps() {
	const res = await fetch('https://fakestoreapi.com/products?limit=4');
	const products = await res.json();
	return {
		props: {
			products,
		},
	};
}


