import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Importar UUID
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TattooCard from "../../components/TattooCard";
import TattooCare from "../../components/TattooCare";
import { getTattoos } from "../../services/tattooService";
import "../Home/Home.css";


const Home = () => {
  const [tattoos, setTattoos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 600);
  handleResize(); // check inicial
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  

  useEffect(() => {
    const fetchTattoos = async () => {
      try {
        const data = await getTattoos();

        // Añadir uuid a cada tattoo si no tiene id
        const dataWithUUID = data.map((tattoo) => ({
          ...tattoo,
          uuid: uuidv4(),
        }));

        setTattoos(dataWithUUID);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTattoos();
  }, []);

  if (loading) return <p>Loading tattoos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Discover</h1>
        <h3>WHAT'S NEW TODAY</h3>
      {isMobile ? (
  <div className="tattoo-carousel">
    <Swiper spaceBetween={20} slidesPerView={1}>
      {tattoos.map((tattoo) => (
       <SwiperSlide key={tattoo.uuid}>
          <TattooCard tattoo={tattoo} />
      </SwiperSlide>
      ))}
    </Swiper>
  </div>
) : (
  <div className="tattoo-list">
    {tattoos.map((tattoo) => (
      <TattooCard key={tattoo.uuid} tattoo={tattoo} />
    ))}
  </div>
)}
  <TattooCare></TattooCare>
    </section>
  );
};

export default Home;
