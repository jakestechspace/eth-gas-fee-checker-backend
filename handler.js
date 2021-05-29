"use strict";

const axios = require("axios");

module.exports.checkGasFees = async (event) => {
  // Construct url from env variables
  const url = `${process.env.API_URL}?api-key=${process.env.API_KEY}`;

  // Make request
  const response = await axios.get(url);
  
  // Destructure values from response
  const {
    fast,
    fastest,
    safeLow, 
    average,
  } = response.data;

  // Divide by 10 to convert to gwei
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
    },
    body: JSON.stringify({
      ...response.data,
      fast: fast / 10,
      fastest: fastest / 10,
      safeLow: safeLow / 10, 
      average: average / 10
    })
  };
};
