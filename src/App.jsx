import { Routes, Route } from 'react-router-dom';
import Portfolio from './portfolio/Portfolio';
import ProjectWrapper from './portfolio/ProjectWrapper';
import Calculator from './Calculator';
import DigitalClock from './DigitalClock';
import WeatherApp from './WeatherApp';
import GoTCharacters from './GoTCharacters';
import Home from './home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />

      <Route
        path="/projects/calculator"
        element={
          <ProjectWrapper title="Calculator">
            <Calculator />
          </ProjectWrapper>
        }
      />

      <Route
        path="/projects/digital-clock"
        element={
          <ProjectWrapper title="Digital Clock">
            <DigitalClock />
          </ProjectWrapper>
        }
      />

      <Route
        path="/projects/weather-app"
        element={
          <ProjectWrapper title="Weather App">
            <WeatherApp />
          </ProjectWrapper>
        }
      />

      <Route
        path="/projects/got-characters"
        element={
          <ProjectWrapper title="GoT Characters">
            <GoTCharacters />
          </ProjectWrapper>
        }
      />

      <Route
        path="/projects/dzimba"
        element={
          <ProjectWrapper title="Dzimba">
            <Home />
          </ProjectWrapper>
        }
      />
    </Routes>
  );
}

export default App;
