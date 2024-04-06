"use client"

import React, { useState } from 'react';
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa';

const WeatherApp = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        const API_KEY =  process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('City name not found');
            }
            const data = await response.json();
            setWeatherData({
                city: data.name,
                temperature: `${data.main.temp}°C`,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} km/h`
            });
            setError('');
        } catch (error) {
            setError(error.message);
            setWeatherData(null); 
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather(location);
    };

    return (
        <div className="max-w-md mx-auto my-10 p-4 shadow-lg rounded-lg">
            <form onSubmit={handleSearch} className="flex mb-5">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="flex-1 p-2 border-2 border-gray-300 rounded-l-lg focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-4 bg-blue-500 text-white rounded-r-lg"
                >
                    Search
                </button>
            </form>
            {error && (
                <div className="mb-4 text-center text-red-500">
                    {error}
                </div>
            )}
            {weatherData && (
                <>
                    <div className="text-center mb-4">Weather in {weatherData.city}</div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <FaTemperatureHigh className="text-2xl text-blue-500 mr-2" />
                            <p>{weatherData.temperature}</p>
                        </div>
                        <div className="flex items-center">
                            <FaTint className="text-2xl text-blue-500 mr-2" />
                            <p>{weatherData.humidity}</p>
                        </div>
                        <div className="flex items-center">
                            <FaWind className="text-2xl text-blue-500 mr-2" />
                            <p>{weatherData.windSpeed}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;
