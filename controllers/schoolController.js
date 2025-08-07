const db = require('../config/db');
const getDistance = require('../utils/distance');

exports.addSchool = (req, res) => {
    const {name, address, latitude, longitude} = req.body;

    if(!name || !address || isNaN(latitude) || isNaN(longitude)){
        return res.status(400).json({error: 'Invalid input'});
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if(err) return res.status(500).json({error: err.message});
        res.status(200).json({message: 'School added successfully', id: result.insertId})
    })
}

exports.listSchools = (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if(isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({error: 'Invalid user coordinates'})
    }

    db.query('SELECT * FROM schools', (err, results) => {
        if(err) return res.status(500).json({error: err.message});

        const schoolsWithDistance = results.map(school => ({
            ...school,
            distance: getDistance(userLat, userLon, school.latitude, school.longitude)
        }));
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    })
}

// export {addSchool, listSchools}