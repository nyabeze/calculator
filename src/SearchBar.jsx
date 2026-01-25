import React, { useState } from "react";
import { MapPin, Bed, DollarSign, Home, Search, ChevronDown } from "lucide-react";
import "./SearchBar.css";

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  return (
    <div className={`searchbar-container ${expanded ? "expanded" : ""}`}>
      {/* Location Field - always visible */}
      <div className="search-field location-field" onClick={handleToggle}>
        <MapPin size={18} />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <ChevronDown size={18} className={`chevron ${expanded ? "rotated" : ""}`} />
      </div>

      {/* Expanded Fields */}
      {expanded && (
        <div className="expanded-fields">
          <div className="search-field">
            <Home size={18} />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
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

          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;