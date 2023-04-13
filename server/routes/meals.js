const express = require('express')
const router = express.Router()
const db = require("../models");

const createReqValidation = (reqData) => {
  // Validate request
  if (!reqData.name) {
    return new Error('Name can\'t be empty!');
  }
  if (!reqData.date) {
    return new Error('Date can\'t be empty!');
  }
  if(new Date(reqData.date).toString() === 'Invalid Date') {
    return new Error('Invalid Date format!');
  }
}

const dateFormatter = (dateString) => {
  let date;
  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date()
  }
  return date.getFullYear()+ '-' + (date.getMonth()+1) + "-" + date.getDate();
}

router.get('/:mealId', (req, res) => {
  db.Meal.findAll({ where: {id: req.params.mealId}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({
      message:
        err.message || "Error occurred while retrieving meals."
    });
  });
})

router.get('/', (req, res) => {
  const dateSearch = dateFormatter(req.query.date);
  console.log(dateSearch)
  db.Meal.findAll({ where: {date: dateSearch}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({
      message:
        err.message || "Error occurred while retrieving meals."
    });
  });
})

router.post('/', (req, res) => {
  const reqVal = createReqValidation(req.body)
  if (reqVal instanceof Error) {
    res.status(400).send({
      message: reqVal.message
    })
  }
  const meal = {
    name: req.body.name,
    date: dateFormatter(req.body.date)
  };
  console.log(meal)
  // Create Tutorial in the database
  db.Meal.create(meal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while creating meal."
      });
    });
})

router.put('/:mealId', (req, res) => {

  console.log(req.params.mealId)
  console.log(req)
  const mealId = req.params.mealId
  console.log(mealId)
  if (!req.body.name) {
    res.status(400).send({
      message: 'Name is required'
    })
  }
  const meal = {
    name: req.body.name
  };
  console.log(meal)
  // Update Meal in the database
  db.Meal.update(meal, {
    where: { id: mealId }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Meal was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update meal with id=${mealId}. Meal not found`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating meal with id=" + mealId
    });
  });
})

module.exports = router