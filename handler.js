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
    fastWait,
    fastest,
    fastestWait,
    safeLow,
    safeLowWait,
    average,
    avgWait,
    gasPriceRange, // spread this out since we aren't using it
    ...rest
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
      ...rest,
      feeData: [
        { speed: "fastest", fee: fastest / 10, wait: fastestWait },
        { speed: "fast", fee: fast / 10, wait: fastWait },
        { speed: "average", fee: average / 10, wait: avgWait },
        { speed: "safeLow", fee: safeLow / 10, wait: safeLowWait },
      ]
    })
  };
};
