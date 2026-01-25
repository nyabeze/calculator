import React, { useEffect } from "react";
import "./WeatherApp.css";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const WeatherApp = () => {
    const [city, setCity] = useState("Harare");
    const [temperature, setTemperature] = useState(null);
    const [condition, setCondition] = useState("");
    const [humidity, setHumidity] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a7aa7fc30f50a9689c04a472671f2c0e`)
            .then(response => response.json())
            .then(data => {
                setTemperature(data.main.temp);
                setCondition(data.weather[0].main);
                setHumidity(data.main.humidity);
                setWindSpeed(data.wind.speed);
                setLoading(false);
            })
    }, [city]);

    return (
        <div className="weather-app">
            <div className="wrapper">
                <div>
                    <div className="city">
                        <h1 >{city}</h1>
                        <select value={city}
                            onChange={(e) => setCity(e.target.value)}>
                            <option value="Harare">Harare</option>
                            <option value="Mutare">Mutare</option>
                            <option value="Gweru">Gweru</option>
                            <option value="Masvingo">Masvingo</option>
                            <option value="Kwekwe">Kwekwe</option>
                            <option value="Bulawayo">Bulawayo</option>
                            <option value="Chitungwiza">Chitungwiza</option>    
                            <option value="Chegutu">Chegutu</option>
                            <option value="Gutu">Gutu</option>
                            <option value="Chivhu">Chivhu</option>
                        </select>
                    </div>
                    <div>
                        <h2 className="temperature">{temperature}°C</h2>
                    </div>
                    <div className="condition">
                        <p className="condition-text">{condition}</p>
                    </div>
                </div>
            </div>
            {loading ? (
            <div className="loading-spinner"></div>
            ) : (
            <div>
                <div className="weather-details">

                    <div>
                        <p>Humity</p>
                        <p>{humidity}%</p>
                    </div>
                    <div className="">
                        <p>Wind</p>
                        <p>{windSpeed} mph</p>
                    </div>
                </div>
            </div>
            )}

        
        </div>




    );
}

export default WeatherApp;