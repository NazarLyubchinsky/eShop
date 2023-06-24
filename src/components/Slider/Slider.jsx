import React from "react";
import SwiperCore, {
	Navigation,
	Pagination,
	Scrollbar,
	Autoplay
} from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./Slider.module.scss";
import Image from "next/image";
import slideImg from "./Screenshot.png"
import mainClother from "../../assets/img/main__clothes_point.svg"

const Slide = () => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, Autoplay]}
			slidesPerView={'auto'}
			navigation
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			autoplay={{ delay: 3000 }}
			className={s.heroslide}>
			<SwiperSlide className={s.hero_slide}>
				<div className={s.heroslide__item}>
					<div className={s.heroslide__item_circle}>
						<p>
							<span className={s.heroslide__text}>SHOP</span> <br />
							CLOTHING <span className={s.circle}><Image src={mainClother} alt="slide1" /></span> <br />
							<span>HERE</span>
						</p>
					</div>
					<Image src={slideImg} alt="slide1" />
				</div>
			</SwiperSlide>
			<SwiperSlide className={s.hero_slide}>
				<div className={s.heroslide__item}>
					<div className={s.heroslide__item_circle}>
						<p>
							<span className={s.heroslide__text}>SHOP</span> <br />
							CLOTHING <span className={s.circle}><Image src={mainClother} alt="slide1" /></span><br />
							<span>HERE</span>
						</p>
					</div>
					<Image src={slideImg} alt="slide2" />
				</div>
			</SwiperSlide>
			<SwiperSlide className={s.hero_slide}>
				<div className={s.heroslide__item}>
					<div className={s.heroslide__item_circle}>
						<p>
							<span className={s.heroslide__text}>SHOP</span> <br />
							CLOTHING <span className={s.circle}><Image src={mainClother} alt="slide1" /></span><br />
							<span>HERE</span>
						</p>
					</div>
					<Image src={slideImg} alt="slide3" />
				</div>
			</SwiperSlide>
		</Swiper>
	);
};

export default Slide;
