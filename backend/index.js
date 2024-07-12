const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/about',
  headers: {
    'X-RapidAPI-Key': 'c90e0b52fbmsh222fbc8893bd115p14583djsne78c14180b7a',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  }
};

	const response =  axios.request(options);
	console.log(response.data);
