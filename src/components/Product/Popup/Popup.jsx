import React from "react";
import Image from "next/image";
import s from "../Popup/Popup.module.scss";

import tick from "../../../assets/img/done.png";

const Popup = ({ onClose }) => {
	return (
		<>
			<div className={s.popup__background} onClick={onClose} />
			<div className={s.popup__main}>
				<Image src={tick} alt="done" width={50} height={50} />
				<p>Item in cart</p>
				<button className={s.popup__main_close} onClick={onClose}>
				Close
				</button>
			</div>
		</>
	);
};

export default Popup;
