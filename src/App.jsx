import { Routes, Route } from 'react-router-dom';
import Portfolio from './portfolio/Portfolio';
import ProjectWrapper from './portfolio/ProjectWrapper';
import Calculator from './Calculator';
import DigitalClock from './DigitalClock';
import WeatherApp from './WeatherApp';
import GoTCharacters from './GoTCharacters';
import Home from './home';
import PasswordManagerDemo from './portfolio/demos/PasswordManagerDemo';
import WorkoutLoggerDemo from './portfolio/demos/WorkoutLoggerDemo';
import RazfitDemo from './portfolio/demos/RazfitDemo';
import StockAlertDemo from './portfolio/demos/StockAlertDemo';
import SpotifyDemo from './portfolio/demos/SpotifyDemo';
import AmazonCheckerDemo from './portfolio/demos/AmazonCheckerDemo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />

      {/* React projects */}
      <Route path="/projects/calculator"    element={<ProjectWrapper title="Calculator"><Calculator /></ProjectWrapper>} />
      <Route path="/projects/digital-clock" element={<ProjectWrapper title="Digital Clock"><DigitalClock /></ProjectWrapper>} />
      <Route path="/projects/weather-app"   element={<ProjectWrapper title="Weather App"><WeatherApp /></ProjectWrapper>} />
      <Route path="/projects/got-characters" element={<ProjectWrapper title="GoT Characters"><GoTCharacters /></ProjectWrapper>} />
      <Route path="/projects/dzimba"        element={<ProjectWrapper title="Dzimba"><Home /></ProjectWrapper>} />

      {/* Python project demos */}
      <Route path="/projects/password-manager"  element={<ProjectWrapper title="Password Manager"><PasswordManagerDemo /></ProjectWrapper>} />
      <Route path="/projects/workout-logger"    element={<ProjectWrapper title="Workout Logger"><WorkoutLoggerDemo /></ProjectWrapper>} />
      <Route path="/projects/razfit"            element={<ProjectWrapper title="Razfit"><RazfitDemo /></ProjectWrapper>} />
      <Route path="/projects/stock-alert"       element={<ProjectWrapper title="Stock Price Alert"><StockAlertDemo /></ProjectWrapper>} />
      <Route path="/projects/spotify-playlist"  element={<ProjectWrapper title="Spotify Playlist Creator"><SpotifyDemo /></ProjectWrapper>} />
      <Route path="/projects/amazon-checker"    element={<ProjectWrapper title="Amazon Price Checker"><AmazonCheckerDemo /></ProjectWrapper>} />
    </Routes>
  );
}

export default App;
