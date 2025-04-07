import { useEffect, useState } from 'react';
import CardList from '../../public/card/CardList';
import { Button } from '../components/Button/Button';
import Card from '../components/Card/Card';
import styles from '../components/Card/Card.module.css';
import CardImage from '../components/CardImage/CardImage';
import Carousel from '../components/Carousel/Carousel';
import { getGeolocation } from '../utils/getGeolocation';

export default function Home() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const captureLocation = async () => {
    try {
      const location = await getGeolocation();
      setLocation(location);
      console.log(
        `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
      );
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  };

  useEffect(() => {
    captureLocation();
  }, []);

  // Função chamada ao clicar no botão
  const handleClick = () => {
    console.log(location);
  };

  return (
    <>
      <div className="">
        <Carousel />
      </div>
      <div>
        <div className="bg-identity">
          <div className="container mx-auto py-16 ph-8 max-w-4xl">
            <a href={'/portfolio'}>
              <div className="grid lg:grid-cols-3">
                {CardList.map((card) => {
                  return (
                    <Card
                      key={card.title}
                      className={`${styles['card-scale-bg']}`}
                    >
                      <CardImage
                        src={card.img}
                        alt="Portfólio"
                        height={90}
                        width={90}
                      />
                      <h3 className="py-3.5 text-primary card-title">
                        {card.title.toUpperCase()}
                      </h3>
                      <p className="text-secondary card-description">
                        {card.text}
                      </p>
                      <a className="inline-flex card-btn" href={'/portfolio'}>
                        <Button onClick={handleClick}>OUVIR</Button>
                      </a>
                    </Card>
                  );
                })}
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
