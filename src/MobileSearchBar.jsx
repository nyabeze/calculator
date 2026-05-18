import React, { useState } from "react";
import { MapPin, Home, Bed, DollarSign, Search, ChevronDown } from "lucide-react";
import "./MobileSearchBar.css";

const MobileSearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [rooms, setRooms] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    const handleClick = () => {
    if (onSearch) onSearch(); // trigger search results
    setExpanded(false); // collapse after search
  };

    return (
        <div className="mobile-searchbar-container">
            {/* Location Field (always visible) */}
            <div className="location-input" onClick={toggleExpanded}>
                <MapPin size={18} className="input-icon" />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    autoFocus
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
                        <span>Search</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MobileSearchBar;