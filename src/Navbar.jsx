import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");

  const handleSearch = () => {
    onSearch({ location, rooms });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-[#FAFAFA] rounded-full shadow-md flex flex-col sm:flex-row items-center gap-2 border border-[#E5E5E5]">
      
      {/* Location Input */}
      <div className="flex-1 px-4 py-2">
        <input
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent outline-none text-[#121212] placeholder-[#999999]"
        />
      </div>

      {/* Rooms Input */}
      <div className="flex-1 px-4 py-2 border-l border-[#E5E5E5] sm:border-l sm:border-r border-[#E5E5E5]">
        <select
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className="w-full bg-transparent outline-none text-[#121212] placeholder-[#999999]"
        >
          <option value="">Any Rooms</option>
          <option value="1">1 Room</option>
          <option value="2">2 Rooms</option>
          <option value="3">3 Rooms</option>
          <option value="4">4+ Rooms</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-[#121212] text-[#FAFAFA] p-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
      >
        <FaSearch />
      </button>
    </div>
  );
}