import Image from 'next/image';
import style from './Slider.module.css';
import { useEffect, useState, useRef } from 'react';

export default function Slider() {
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3000/carousel/carousel.json')
      .then((response) => response.json())
      .then(setData);
  }, []);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;

    if (carousel.current.scrollLeft === 0) {
      carousel.current.scrollLeft += carousel.current.offsetWidth * 2;
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;

    if (carousel.current.scrollLeft === carousel.current.offsetWidth * 2) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth * 2;
    }
  };

  if (!data || !data.length) return null;

  return (
    <div className={style.container}>
      <div className={style.carousel} ref={carousel}>
        <div className={style.buttons}>
          <button onClick={handleLeftClick}>
            <Image
              src="http://localhost:3000/carousel/images/prev-icon.svg"
              alt="Scroll left"
              width={25}
              height={25}
            />
          </button>
          <button onClick={handleRightClick}>
            <Image
              src="http://localhost:3000/carousel/images/next-icon.svg"
              alt="Scroll right"
              width={25}
              height={25}
            />
          </button>
        </div>
        {data.map((item) => {
          const { id, title, subtitle, image } = item;
          return (
            <div className={style.item} key={id}>
              <div className={style.image}>
                <div className={style.info}>
                  <span className={style.title}>{title}</span>
                  <span className={style.subtitle}>{subtitle}</span>
                </div>
                <Image
                  src={image}
                  className={style.img}
                  alt={title}
                  width={1480}
                  height={614}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
