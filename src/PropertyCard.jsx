import React from "react";
import {
  MapPin,
  Bed,
  Droplet,
  Lock,
  Sun
} from "lucide-react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      
      <div className="property-image">
        <img src={property.image} alt={property.title} />
      </div>

      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>

        <div className="property-location">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>

        <div className="property-meta">
          <span className="meta">
            <Bed size={14} /> {property.rooms} rooms
          </span>
          <span className="meta">{property.type}</span>
        </div>

        {/* AMENITIES PREVIEW */}
        <div className="property-amenities">
          {property.borehole && (
            <span className="amenity">
              <Droplet size={14} />
              Borehole
            </span>
          )}

          {property.gated && (
            <span className="amenity">
              <Lock size={14} />
              Gated
            </span>
          )}

          {property.solar && (
            <span className="amenity">
              <Sun size={14} />
              Solar
            </span>
          )}
        </div>

        <div className="property-price">
          ${property.price} <span>/ month</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;