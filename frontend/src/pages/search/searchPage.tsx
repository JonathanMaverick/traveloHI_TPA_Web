import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import HotelSearch from './hotelSearch';
import FlightSearch from './flightSearch';
import "../../styles/pages/search/search.scss"
import { FaHotel, FaPlaneDeparture } from 'react-icons/fa';

export default function SearchPage() {
  const { query } = useParams();

  useEffect(() => {
    document.title = `Search Results for "${query}"`;
  }, []);

  const [showHotelSearch, setShowHotelSearch] = useState(true);
  const [showFlightSearch, setShowFlightSearch] = useState(false);

  const [sortOption, setSortOption] = useState<string>("");
  const handleSortCheckboxChange = (option:string) => {
    setSortOption((prevSortOption) => (prevSortOption === option ? "" : option));
  };


  const handleHotelCheckboxChange = () => {
    setShowHotelSearch(true);
    setShowFlightSearch(false);
  };

  const handleFlightCheckboxChange = () => {
    setShowHotelSearch(false);
    setShowFlightSearch(true);
  };

  return (
    <div className='search-page'>
      <h2>Search Results for "{query?.trim()}"</h2>
      <div className='search-content'>
        <div className='search-sorting-container'>
            <h4>Filter :</h4>
            <div className="checkbox-container">
                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={showHotelSearch}
                    onChange={handleHotelCheckboxChange}
                    />
                    <span className="checkbox-custom">
                    <FaHotel className="checkbox-icon" />
                    </span>
                    Hotel
                </label>
            </div>
            <div className="checkbox-container">
                <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={showFlightSearch}
                      onChange={handleFlightCheckboxChange}
                    />
                    <span className="checkbox-custom">
                      <FaPlaneDeparture className="checkbox-icon" />
                    </span>
                    Flight
                </label>
            </div>
            {showFlightSearch && (
              <>
                <h4>Sort by :</h4>
                <div className="checkbox-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={sortOption === 'duration'}
                      onChange={() => handleSortCheckboxChange('duration')}
                    />
                    Duration
                  </label>
                </div>
                <div className="checkbox-container">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={sortOption === 'price'}
                      onChange={() => handleSortCheckboxChange('price')}
                    />
                    Price
                  </label>
                </div>
              </>
            )}
        </div>      
        {showHotelSearch && <HotelSearch />}
        {showFlightSearch && <FlightSearch sortOption={sortOption} />}  
      </div>
    </div>
  );
}

