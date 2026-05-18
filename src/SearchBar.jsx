import DesktopSearchBar from "./DesktopSearchBar";
import MobileSearchBar from "./MobileSearchBar";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  return (
    <>
      <div className="search-desktop">
        <DesktopSearchBar onSearch={onSearch}/>
      </div>

      <div className="search-mobile">
        <MobileSearchBar onSearch={onSearch}/>
      </div>
    </>
  );
};

export default SearchBar