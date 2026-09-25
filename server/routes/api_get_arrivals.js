//
// GET /arrivals?routeId=&stopId=&type=bus|train
//
// Live CTA prediction passthrough. Calls the CTA API and returns normalized
// predictions to the client so it can show upcoming arrivals in real time.
//
// Response: { message, data: [{ eta, vehicleId, routeId, stopId, direction, type }] }
//

const { getBusPredictions } = require('@cta/shared');

exports.get_arrivals = async (req, res) => {
    try{
        console.log('**Call to GET /arrivals...');
        const { routeId, stopId, type } = req.query;

        if(!stopId) {
            return res.status(400).json({
                message: 'Missing required query param: stopId',
                data: [],
            });
        }
        if(!routeId) {
            return res.status(400).json({
                message: 'Missing required query param: routeId',
                data: [],
            });
        }


        const predictions = await getBusPredictions(routeId, stopId);

        console.log(`Retrieved ${predictions.length} predictions for stop ${stopId}`);

        res.json({ message: 'success', data: predictions });

    }catch(err){
        console.log('ERROR:', err.message);
        res.status(500).json({ message: err.message, data: [] });
    }
}