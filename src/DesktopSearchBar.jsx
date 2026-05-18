import React, { useState } from "react";
import { MapPin, Bed, DollarSign, Home, Search } from "lucide-react";
import './DesktopSearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleClick = () => {
    if (onSearch) onSearch(); // trigger search results
  };

  return (
    <div className="searchbar-container">
      <div className="search-field">
        <MapPin size={18} />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="search-field">
        <Home size={18} />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Any</option>

          {/* Residential */}
          <option value="house">House</option>
          <option value="apartment">Apartment / Flat</option>
          <option value="cottage">Cottage</option>
          <option value="room">Individual Room</option>
          <option value="boarding_house">Boarding House</option>

          {/* Short-term */}
          <option value="short_stay">Short-Term Stay</option>
          <option value="guesthouse">Guest House</option>

          {/* Commercial */}
          <option value="shop">Shop / Retail Space</option>
          <option value="office">Office Space</option>
        </select>
      </div>

      <div className="search-field">
        <Bed size={18} />
        <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
          <option value="">Rooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="search-field">
        <DollarSign size={18} />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <button className="search-btn" onClick={handleClick}>
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;