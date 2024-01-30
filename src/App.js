// src/App.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faBriefcase,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator';
import './App.css';

const links = [
  { id: 1, title: 'Home', url: '/', icon: faHome },
  { id: 2, title: 'About', url: 'https://syahrulramadhan.id/blog/about', icon: faUser },
  { id: 3, title: 'Portfolio', url: 'https://syahrulramadhan.id/blog/portofolio/', icon: faBriefcase },
  { id: 4, title: 'Contact', url: 'https://syahrulramadhan.id/blog/contact', icon: faEnvelope },
];

const socialMedia = [
  { id: 1, title: 'LinkedIn', icon: faLinkedin, url: 'https://www.linkedin.com/in/syahrul-ramadhan-8a4109229/' },
  { id: 2, title: 'GitHub', icon: faGithub, url: 'https://github.com/syahrulrmdhncode' },
  { id: 3, title: 'Twitter', icon: faTwitter, url: 'https://twitter.com/Syahrulrmdhn091' },
  { id: 4, title: 'Instagram', icon: faInstagram, url: 'https://www.instagram.com/syahrulrmdhn_0911' },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Simulasi loading dengan timeout (ganti dengan logika sesuai kebutuhan)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Mendapatkan lokasi pengguna
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    try {
      const apiKey = '6a18eb827c664e7a8c9a18f1050965fb';
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      const address = response.data.results[0].formatted;
      setUserLocation({ latitude, longitude, address });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-r from-blue-400 to-purple-500 bg-gradient-animation'}`}>
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          Syahrul <span className="text-blue-500">Ramadhan</span>
        </h1>
        <div className="mb-4">
          <img
            src="./syahrul.jpg"
            alt="Foto Syahrul"
            className="rounded-full w-32 h-32 mx-auto mb-2 object-cover"
          />
          <div className={`bg-${isDarkMode ? 'gray-800' : 'gray-800'} text-${isDarkMode ? 'white' : 'white'} text-sm p-2 text-center`}>
            Network Engineer / Application Support
          </div>
        </div>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ul>
            {links.map((link) => (
              <li
                key={link.id}
                className={`mb-4 rounded-md overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black hover:bg-blue' : 'bg-white hover:bg-blue-500 hover:text-black'}`}
              >
                <a
                  href={link.url}
                  className={`block p-4 text-${isDarkMode ? 'black' : 'blue-500'} hover:text-white`}
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-2 text-xl" />
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex justify-center">
          {socialMedia.map((social) => (
            <a
              key={social.id}
              href={social.url}
              className={`text-gray-600 hover:text-${isDarkMode ? 'white' : 'white'} mx-3 transform transition-transform duration-300 hover:translate-y-1`}
            >
              <FontAwesomeIcon icon={social.icon} size="2x" />
            </a>
          ))}
        </div>
        <p className="mt-6 text-gray-600">
          Created with <span className="text-red-500">&#10084;</span> by Syahrul Ramadhan
        </p>
        {userLocation && (
          <div className="mt-4 text-gray-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            Lokasi Kamu: {userLocation.address}
          </div>
        )}
        <button
          className={`mt-4 p-2 text-white ${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'}`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default App;
