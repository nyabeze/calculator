import DesktopSearchBar from "./DesktopSearchBar";
import MobileSearchBar from "./MobileSearchBar";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <>
      <div className="search-desktop">
        <DesktopSearchBar />
      </div>

      <div className="search-mobile">
        <MobileSearchBar />
      </div>
    </>
  );
};

export default SearchBar