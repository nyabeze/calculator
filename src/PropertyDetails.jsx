// src/pages/PropertyDetails.jsx

import { useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();

  // simulate authentication
  const isLoggedIn = true; // replace later with auth context

  const property = {
    id,
    title: "Luxury Villa in Mount Pleasant",
    price: 1200,
    offeredPrice: 1100,
    location: "Mount Pleasant, Harare",
    bedrooms: 4,
    bathrooms: 3,
    type: "Villa",

    images: [
      "/images/house1.jpg",
      "/images/house2.jpg",
      "/images/house3.jpg",
      "/images/house4.jpg",
    ],

    amenities: [
      "Solar Backup",
      "Borehole",
      "Wi-Fi",
      "Swimming Pool",
      "24/7 Security",
      "Parking"
    ],

    description:
      "Spacious luxury villa located in Mount Pleasant with modern finishes, solar backup, borehole, and private garden. Perfect for families.",

    landlord: {
      name: "Ryan Nyabeze",
      phone: "+263778000000",
      email: "ryan@email.com"
    },

    coordinates: {
      lat: -17.7833,
      lng: 31.05
    }
  };

  const [mainImage, setMainImage] = useState(property.images[0]);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-8">

      {/* Top Section */}
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          {property.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {property.location}
        </p>

        <h2 className="text-2xl font-semibold mb-6">
          ${property.price}/month
        </h2>

        {/* IMAGE GALLERY */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div>
            <img
              src={mainImage}
              alt=""
              className="rounded-xl w-full h-[500px] object-cover"
            />

            <div className="flex gap-3 mt-4">
              {property.images.map((img,index)=>(
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setMainImage(img)}
                  className="w-24 h-20 rounded-lg object-cover cursor-pointer border"
                />
              ))}
            </div>

          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-xl font-semibold mb-4">
              Property Details
            </h3>

            <div className="space-y-3 text-gray-700">
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <p>Type: {property.type}</p>
            </div>

            <hr className="my-6"/>

            <h3 className="font-semibold mb-3">
              Offered Price
            </h3>

            <div className="text-green-600 text-2xl font-bold mb-4">
              ${property.offeredPrice}
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg">
              Make an Offer
            </button>

          </div>

        </div>


        {/* Description */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">
            Description
          </h3>

          <p className="text-gray-700 leading-7">
            {property.description}
          </p>
        </section>


        {/* Amenities */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">
            Amenities
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {property.amenities.map((item,index)=>(
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </section>


        {/* GOOGLE MAP */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">
            Location
          </h3>

          <iframe
            title="map"
            width="100%"
            height="450"
            style={{border:0}}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
            className="rounded-xl"
          />
        </section>


        {/* CONTACTS (Protected) */}
        <section className="mb-10">

          <h3 className="text-2xl font-semibold mb-4">
            Contact Owner
          </h3>

          {isLoggedIn ? (
            <div className="bg-white p-6 rounded-xl shadow">
              <p>Name: {property.landlord.name}</p>
              <p>Phone: {property.landlord.phone}</p>
              <p>Email: {property.landlord.email}</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border p-6 rounded-xl">
              Login to view owner contact details.
            </div>
          )}

        </section>

      </div>

    </div>
  );
}