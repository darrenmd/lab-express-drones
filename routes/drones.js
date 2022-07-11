const express = require('express');
const router = express.Router();

// require the Drone model 

const Drone = require("../models/Drone.model");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then( (dronesFromDB) => {
      const data = {
        dronesArr: dronesFromDB
      };
      res.render("drones/list", data)
    })
    .catch( (error) => {
      console.log("Error getting data from DB", error);
      next(error);
    })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  router.get("/drones/create", (req, res) => {
    res.render("drones/drone-create");
  })
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone

  const drones = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.MaxSpeed,
  };

  Drone.create(drones)
    .then( () => {
      res.redirect("/drones");
    })
    .catch( (error) => {
      console.log("Error creating drone in the DB", error);
      next(error);
    })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {droneId} = req.params;

  Drone.findById(droneId)
    .then( (drones) => {
      res.render("drones/62cc51cd565a994b2f9d05e7/edit", drones);
    })
    .catch( (error) => {
      console.log("Error getting drone details from DB", error);
      next(error);
    })

 
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone

  const droneId = req.params.droneId;

  const newDetails = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  }


  Drone.findByIdAndUpdate(droneId, newDetails)
    .then( () => {
      res.redirect("/drones");
    })
    .catch( (error) => {
      console.log("Error updating drone in DB", error);
      next(error);
    })


});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const {droneId} = req.params;

  Book.findByIdAndRemove(droneId)
    .then( () => {
      res.redirect('/drones');
    })
    .catch( (error) => {
      console.log("Error deleting drone from DB", error);
      next(error);
    })

});

module.exports = router;
