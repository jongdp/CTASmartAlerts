//
// CTA Smart Alerts — web service (Node.js + Express)
// Handles alert CRUD and live arrival passthrough.
//
// Author:
//   Jonathan Garcia de Paz
//

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

let startTime;

// Health check — browse to http://localhost:8080 to confirm server is up
app.get('/',(req, res)=>{
  try{
    let uptime = Math.round((Date.now() - startTime) / 1000);
    res.json({ status: "running", uptime_in_secs: uptime });
  } catch (err){
    res.status(500).json({ status: err.message });
  }
});

//
// API routes — one file per endpoint (same pattern as Project 02)
//

// 1. GET /arrivals — live CTA predictions (?routeId=&stopId=&type=bus|train)
const getArrivals = require('./routes/api_get_arrivals.js');
app.get('/arrivals', getArrivals.get_arrivals)


app.listen(port, () => {
  startTime = Date.now();
  console.log(`**Web service running, listening on port ${port}...`);
});