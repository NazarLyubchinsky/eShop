
import "@/styles/globals.scss";
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.css'

import "@/styles/globals.scss";
// libs styles
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
// layouts components

import Layouts from "@/layouts";

export default function App({ Component, pageProps }) {
	return (
		<Layouts>
			<Component {...pageProps} />
		</Layouts>
	);
}
