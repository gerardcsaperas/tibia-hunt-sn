const express = require("express");
const router = express.Router();

const CharacterModel = require('../models/Character.model')





// Create a new character // FULL ROUTE -> /character/new
router.post('/character', (req, res) => {
    const {user, characterName, world, vocation, level, skills} = req.body
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


// Edits a specific character // FULL ROUTE -> /character/:charID
router.patch("/:charID", (req,res) => {
    let id = req.params.charID
    const {characterName, world, vocation, level, skills} = req.body

    CharacterModel.findByIdAndUpdate(id, {$set: {characterName, world, vocation, level, skills}})
        .then((response) => {
          res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
               error: 'Something went wrong',
               message: err
            })
        })  
})



// Deletes a character from the data base // FULL ROUTE -> /character/:id
router.delete('/:id', (req, res) => {
    CharacterModel.findByIdAndDelete(req.params.id)
    .then((character) => {
        res.status(200).json(character)
    })
    .catch((err) => {
        res.status(500).json({
            error: 'Something went wrong',
            message: err
        })
    })  
})


module.exports = router;