import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  // Modification : Vérification de data?.focus
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  let timer;

  const nextSlide = () => {
    const newIndex = (index + 1) % byDateDesc.length;
    setIndex(newIndex);
  };

  useEffect(() => {
    if (byDateDesc && byDateDesc.length > 0) {
      timer = setTimeout(nextSlide, 5000);
    }
    return () => clearTimeout(timer);
  }, [index, byDateDesc]); // Mettre à jour le slider quand l'index change

  const handleSlideChange = (idx) => {
    clearTimeout(timer); // Arrête le changement automatique
    setIndex(idx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleSlideChange(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;