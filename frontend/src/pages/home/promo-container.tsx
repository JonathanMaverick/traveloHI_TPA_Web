import { useEffect, useState } from "react"
import get_top_promos from "../../api/promo/get_carousel_promo";
import "../../styles/pages/promo/promo_container.scss";
import { IPromo } from "../../interfaces/promo/promo-interface";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function PromoContainer() {
    const [promos, setPromos] = useState<IPromo[]>([]);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [visiblePromos, setVisiblePromos] = useState<IPromo[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_top_promos();
                if(response != -1){
                    setPromos(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [])
    
    useEffect(() => {
        let startIndex = currentPromoIndex;
        let endIndex = startIndex + 3;
    
        if (endIndex > promos.length) {
            endIndex = endIndex - promos.length;
        }
    
        const promoWrapper = document.querySelector('.promo-wrapper') as HTMLElement | null;
        if (promoWrapper) {
            promoWrapper.style.opacity = '0';
        }
    
        let promosToShow: IPromo[];
    
        if (endIndex > startIndex) {
            promosToShow = promos.slice(startIndex, endIndex);
        } else {
            promosToShow = [...promos.slice(startIndex), ...promos.slice(0, endIndex)];
        }
    
        if (promosToShow.length > 4) {
            promosToShow = promosToShow.slice(0, 4);
        }
    
        setTimeout(() => {
            setVisiblePromos(promosToShow);
            if (promoWrapper) {
                promoWrapper.style.opacity = '1';
            }
        }, 500);
    
    }, [currentPromoIndex, promos]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromoIndex((prevIndex) =>
                prevIndex === promos.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval); 
    }, [promos]);
    
    const showNextPromo = () => {
        setCurrentPromoIndex((prevIndex) =>
            prevIndex === promos.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const showPreviousPromo = () => {
        setCurrentPromoIndex((prevIndex) =>
            prevIndex === 0 ? promos.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="promo-container">
          <h1>Promo</h1>
          <div className="promo-carousel">
            <button className="prev-button" onClick={showPreviousPromo}><FaArrowLeft /></button>
            <div className="promo-wrapper">
              {visiblePromos.length > 0 ? (
                visiblePromos.map((promo, index) => (
                  <div key={index} className="promo-item">
                    {promo && promo.promoPicture && (
                        <img
                        src={promo.promoPicture}
                        alt={`promo ${index + 1}`}
                        className="promo-image"
                        />
                    )}
                  </div>
                ))
              ) : (
                <p>No promos available.</p>
              )}
            </div>
            <button className="next-button" onClick={showNextPromo}><FaArrowRight /></button>
          </div>
        </div>
      );
    };

