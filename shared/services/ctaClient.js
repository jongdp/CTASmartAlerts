//
// CTA API client.
// Handles both Bus Tracker and Train Tracker APIs, and normalizes
// all predictions into one consistent format for the rest of the app:
//   { eta, vehicleId, routeId, stopId, direction, type }
//
const axios = require('axios');

const BUS_BASE   = 'http://www.ctabustracker.com/bustime/api/v2';
const TRAIN_BASE = 'https://lapi.transitchicago.com/api/1.0';

//
// getBusPredictions
// Fetches bus ETAs for a given route + stop.
// Returns sorted array (soonest first), empty array if no predictions.
//
async function getBusPredictions(routeId, stopId) {
    // constructing the url w/ params for axios
    const url = `${BUS_BASE}/getpredictions`;
    const params = {
        key: process.env.CTA_BUS_API_KEY,
        rt: routeId,
        stpid: stopId,
        format: 'json',
    };

    // using axios to access the CTA API
    const response = await axios.get(url, { params, timeout: 8000 });
    
    // evaluating the response body (CTA returns an error array when no buses are predicted — not a crash)
    const body = response.data['bustime-response'];
    if (!body || body.error) return [];

    // returning the array of objects listed in order of lowest eta
    return (body.prd || []).map(p =>({
        eta: parseInt(p.prdctdn === 'DUE' ? '0' : p.prdctdn, 10),
        vehicleId: p.vid,
        routeId: p.rt,
        stopId: String(p.stpid),
        direction: p.rtdir,
        type: 'bus',
    })).sort((a,b) => a.eta - b.eta);

}

module.exports = { getBusPredictions };