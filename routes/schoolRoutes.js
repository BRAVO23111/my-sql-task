import express from "express";
import School from "../models/school.js";
import { getDistance } from "../utils/distance.js";
const router = express.Router();

router.post('/add-school', async (req, res) => {
    try {
        const {name , address , latitude , longitude} = req.body;
        if(!name || !address || !latitude || !longitude){
            return res.status(400).json({ error: "All fields are required" });
        }
        if(isNaN(latitude) || isNaN(longitude)){
            return res.status(400).json({ error: "Latitude and longitude must be numbers" });
        }
        const school = await School.create(name, address, latitude, longitude);
        res.status(201).json({
            message: "School created successfully",
            school,
            id: school.id,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/listSchools', async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
  
      if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Valid coordinates are required' });
      }
  
      const schools = await School.findAll();
      
      const schoolsWithDistance = schools.map(school => ({
        ...school,
        distance: getDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        )
      }));
  
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
      
      res.json(schoolsWithDistance);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export  {router as SchoolRouter};
