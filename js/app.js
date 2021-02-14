/********************
 *
 * Load from storage on DOM LOAD
 *
 ********************/

/********************
 *
 * IMPORT WEATHER APP FUNCTIONALITY
 *
 ********************/

import { fetchWeather } from './weatherApp.js';
import { weatherAPI } from './api-keys.js';

/********************
 *
 * WEATHER APP
 *
 ********************/

const inputWeather = document.getElementById('search-city');
const btnWeather = document.getElementById('btn-weather');

// Get user input on click
btnWeather.addEventListener('click', (e) => {
  e.preventDefault();
  // Get city and pass to API call
  const citySearch = inputWeather.value;
  // constrcut the api call
  const weatherAPICall = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&units=metric&appid=${weatherAPI}`;

  // Check for input
  if (inputWeather.value) {
    // Fetch data but clear first
    fetchWeather(weatherAPICall);
    inputWeather.value = '';
  } else {
    throw new Error('please select a city');
  }
});

/********************
 *
 * IMPORT NEWS APP FUNCTIONALITY
 *
 ********************/

import { fetchNews } from './newsApp.js';
import { newsAPI } from './api-keys.js';

/********************
 *
 * NEWS APP
 *
 ********************/

const inputNews = document.getElementById('search-news');
const btnNews = document.getElementById('btn-news');

// Get user input on click
btnNews.addEventListener('click', (e) => {
  e.preventDefault();
  // Get city and pass to API call
  const newsSearch = inputNews.value;
  // constrcut the api call
  const newsAPICall = `https://gnews.io/api/v4/search?q=${newsSearch}&country=gb&max=3&token=${newsAPI}`;

  // Check for input
  if (inputNews.value) {
    // Fetch data
    fetchNews(newsAPICall);
    inputNews.value = '';
  } else {
    throw new Error('please select a topic');
  }
});

/********************
 *
 * IMPORT FOOD APP FUNCTIONALITY
 *
 ********************/

import { fetchFood, renderFoodList } from './foodApp.js';
import { foodAPI } from './api-keys.js';

/********************
 *
 * FOOD APP
 *
 ********************/

const inputFood = document.getElementById('search-food');
const btnFood = document.getElementById('btn-food');

// Get user input on click
btnFood.addEventListener('click', (e) => {
  e.preventDefault();

  const foodSearch = inputFood.value;
  const foodAPIcall = `https://www.themealdb.com/api/json/v1/${foodAPI}/search.php?s=${foodSearch}`;

  if (inputFood.value) {
    fetchFood(foodAPIcall);
    inputFood.value = '';
  } else {
    throw new Error('please select a food!');
  }
});
