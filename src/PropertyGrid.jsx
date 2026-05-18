import React from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyGrid.css";

// const properties = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
//     title: "Modern Apartment in Borrowdale",
//     location: "Harare",
//     price: 450,
//     rooms: 2,
//     type: "Apartment",

//     // Amenities
//     borehole: true,
//     gated: true,
//     solar: false,
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
//     title: "Family House in Greendale",
//     location: "Harare",
//     price: 600,
//     rooms: 3,
//     type: "House",

//     // Amenities
//     borehole: true,
//     gated: true,
//     solar: true,
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
//     title: "Luxury Villa in Mount Pleasant",
//     location: "Harare",
//     price: 1200,
//     rooms: 4,
//     type: "Villa",

//     // Amenities
//     borehole: true,
//     gated: true,
//     solar: true,
//   },
// ];

const PropertyGrid = ({ title, properties }) => {
  return (
    <section className="property-section">
      <h2 className="section-title">{title}</h2>

      <div className="property-scroll">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default PropertyGrid;