var axios = require('axios');

var config = {
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc',
  headers: { 
    'Authorization': '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'
  }
};
const api = axios.create(config)

module.exports = api;
