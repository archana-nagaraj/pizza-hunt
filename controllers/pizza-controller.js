const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas method will serve as callback function for the GET /api/pizzas route.
    // It uses the Mongoose .find() method, much like the Sequelize .findAll() method.

    getAllPizza(req, res) {
      Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one pizza by id method - uses the Mongoose .findOne() method to find a single pizza by its _id.
    getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
          // If no pizza is found, send 404
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // createPizza method to handle POST /api/pizzas 
    // In Mongoose we use the method .create() to create data
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },


    // update pizza by id method will handle PUT /api/pizzas/:id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete pizza method will handle DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
  }

module.exports = pizzaController;