const express = require("express");
const router = express.Router();

const CharacterModel = require('../models/Character.model')





// Create a new character // FULL ROUTE -> /character/new
router.post('/character', (req, res) => {
    const {user, characterName, world, vocation, level, skills} = req.body
    console.log(req.body)
    CharacterModel.create({user, characterName, world, vocation, level, skills})
      .then((character) => {
        res.status(200).json(character)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          error: 'Something went wrong',
          errorMessage: err
         })
      })
  })






module.exports = router;