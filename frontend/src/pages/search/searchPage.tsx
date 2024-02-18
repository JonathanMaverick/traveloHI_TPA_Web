import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import HotelSearch from './hotelSearch';
import FlightSearch from './flightSearch';
import "../../styles/pages/search/search.scss"
import { FaHotel, FaPlaneDeparture } from 'react-icons/fa';
import get_facilities from '../../api/hotel/get_facilities';
import { IFacility } from '../../interfaces/hotel/facility-interface';

export default function SearchPage() {
  const { query } = useParams();

  useEffect(() => {
    document.title = `Search Results for "${query}"`;
    const fetchdata = async () => {
      const response = await get_facilities();
      if (response == -1){
        return;
      }else{
        setFacilities(response.data);
      }
      return response;
    }
    fetchdata();
  }, []);

  const [showHotelSearch, setShowHotelSearch] = useState(true);
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<IFacility[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [hotelSortOption, setHotelSortOption] = useState<string>("");
  const [roomAvailabilitySortOption, setRoomAvilabilitySortOption] = useState<string>("");
  const [ratingSortOption, setRatingSortOption] = useState<string>("");
  const [reviewCountSortOption, setReviewCountSortOption] = useState<string>("");
  const [ratingFilterOption, setRatingFilterOption] = useState<boolean>(false);
  const [priceFilterOption, setPriceFilterOption] = useState<boolean>(false);

  const handleSortCheckboxChange = (option:string) => {
    setSortOption((prevSortOption) => (prevSortOption === option ? "" : option));
  };

  const handleFacilityCheckboxChange = (facility:IFacility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities((prevSelectedFacilities) =>
        prevSelectedFacilities.filter((name) => name !== facility)
      );
    } else {
      setSelectedFacilities((prevSelectedFacilities) => [...prevSelectedFacilities, facility]);
    }
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
        <div className='sorting-content'>
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
            </div>
              {showFlightSearch && (
                <div className='search-sorting-container'>
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
                </div>
              )}
              {showHotelSearch && (
              <> 
                <div className='search-sorting-container'>
                  <h4>Facilities :</h4>
                  {facilities.map((facility) => (
                    <div key={facility.facilitiesName} className="checkbox-container">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          className="checkbox-input"
                          checked={selectedFacilities.includes(facility)}
                          onChange={() => handleFacilityCheckboxChange(facility)}
                        />
                        {facility.facilitiesName}
                      </label>
                    </div>
                  ))}
                </div>
                <div className='search-sorting-container'>
                  <h4>Price :</h4>
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={hotelSortOption === 'ascending'}
                        onChange={() => setHotelSortOption(hotelSortOption === 'ascending' ? '' : 'ascending')}
                      />
                      Ascending
                    </label>
                  </div>
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={hotelSortOption === 'descending'}
                        onChange={() => setHotelSortOption(hotelSortOption === 'descending' ? '' : 'descending')}
                      />
                      Descending
                    </label>
                  </div>
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={priceFilterOption}
                        onChange={() => setPriceFilterOption(!priceFilterOption)}
                      />
                      Below 10000
                    </label>
                  </div>
                </div>
                <div className='search-sorting-container'>
                  <h4>Room Availability :</h4>
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={roomAvailabilitySortOption === 'ascending'}
                        onChange={() => setRoomAvilabilitySortOption(roomAvailabilitySortOption === 'ascending' ? '' : 'ascending')}
                      />
                      Ascending
                    </label>
                  </div>
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={roomAvailabilitySortOption === 'descending'}
                        onChange={() => setRoomAvilabilitySortOption(roomAvailabilitySortOption === 'descending' ? '' : 'descending')}
                      />
                      Descending
                    </label>
                  </div>
                </div>
                <div className='search-sorting-container'>
                  <h4>Rating :</h4>
                  <div className="checkbox-container">
                      <label className="checkbox-label">
                          <input
                              type="checkbox"
                              className="checkbox-input"
                              checked={ratingSortOption === 'ascending'}
                              onChange={() => setRatingSortOption(ratingSortOption === 'ascending' ? '' : 'ascending')}
                          />
                          Ascending
                      </label>
                  </div>
                  <div className="checkbox-container">
                      <label className="checkbox-label">
                          <input
                              type="checkbox"
                              className="checkbox-input"
                              checked={ratingSortOption === 'descending'}
                              onChange={() => setRatingSortOption(ratingSortOption === 'descending' ? '' : 'descending')}
                          />
                          Descending
                      </label>
                  </div>
                  <div className="checkbox-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={ratingFilterOption}
                        onChange={() => setRatingFilterOption(!ratingFilterOption)}
                      />
                      Above 5
                    </label>
                  </div>
                </div>
                <div className='search-sorting-container'>
                  <h4>Review Count :</h4>
                  <div className="checkbox-container">
                      <label className="checkbox-label">
                          <input
                              type="checkbox"
                              className="checkbox-input"
                              checked={reviewCountSortOption === 'ascending'}
                              onChange={() => setReviewCountSortOption(reviewCountSortOption === 'ascending' ? '' : 'ascending')}
                          />
                          Ascending
                      </label>
                  </div>
                  <div className="checkbox-container">
                      <label className="checkbox-label">
                          <input
                              type="checkbox"
                              className="checkbox-input"
                              checked={reviewCountSortOption === 'descending'}
                              onChange={() => setReviewCountSortOption(reviewCountSortOption === 'descending' ? '' : 'descending')}
                          />
                          Descending
                      </label>
                  </div>
                </div>
              </>
            )}
        </div>
        {showHotelSearch && <HotelSearch 
        selectedFacilities={selectedFacilities} 
        hotelSortOption={hotelSortOption} 
        roomAvailabilitySortOption = {roomAvailabilitySortOption} 
        ratingSortOption = {ratingSortOption}
        ratingFilterOption = {ratingFilterOption}
        reviewCountSortOption = {reviewCountSortOption}
        priceFilterOption = {priceFilterOption}
        />}
        {showFlightSearch && <FlightSearch sortOption={sortOption} />}  
      </div>
    </div>
  );
}

