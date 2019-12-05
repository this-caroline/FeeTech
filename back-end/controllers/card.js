const card = require('../db/models').Card;
const user = require('../db/models').User;
const ResFormat = require('../core').ResponseFormat;
var createError = require('http-errors');

module.exports = {
    async create(req, res) {
        return card
        .create({
            amount: req.body.amount,
            card_name: req.body.card_name,
            user_id: req.params.userId,
            removed: req.body.removed,
        })
        .then(card => res.status(201).json(ResFormat.build(
            card,
            "Card Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResFormat.error(
            error,
            "Something went wrong when create Card",
            "error"
        )))
    },

    async list(req, res) {
        await user.findById(req.params.userId)
        .then(data =>{ 
            if(!data){
            res.status(400).json(
                ResFormat.valError("User doesn't exists", 404)
        )}})

        return card
        .findAll({ where:{'user_id': req.params.userId}})
        .then(card =>{ 
            if(!card.length)res.status(200).json(ResFormat.valError("No cards availables", 404))
            else{
                res.status(200).json(ResFormat.build(
                    card,
                    "User card Information Reterive successfully",
                    200,
                    "success"
                ))
            }
           }
        )
        .catch(error => res.status(400).send(ResFormat.build(
            error,
            "Something went wrong when Reterieve User card Information",
            400,
            "error"
        )));
    },
  
    async update(req, res) {
        await user.findById(req.params.userId)
        .then(data =>{ 
            if(!data){
            res.status(400).json(
                ResFormat.valError("User doesn't exists", 404)
        )}});

        return card
        .findById(req.body.card_id)
        .then(data => {
            if(!data) {
                return res.status(404).json(
                    ResFormat.error(
                        {},
                        "Card not found",
                        404,
                        "error"
                    )
                );
            }

            return data
            .update({
                amount: req.body.amount || data.amount ,
                card_name: req.body.card_name || data.card_name ,
                removed: req.body.removed || data.removed ,
            })
            .then(() => res.status(200).json(
                ResFormat.build(
                    data,
                    "Card Updated successfully",
                    200,
                    "success"
            )))
            .catch((error) => res.status(500).json(
                ResFormat.build(
                    {},
                    "Someting went wrong when update the user card",
                    500,
                    "error"
                )
            ));
        });
    },
    async destroy (req, res) {
        await user.findById(req.params.userId)
        .then(usr =>{ 
            if(!usr){
                res.status(400).json(
                ResFormat.valError("User doesn't exists", 404)
        )}});

        return card
        .findById(req.body.card_id)
        .then(data => {
            if(!data) {
                return res.status(404).json(
                    ResFormat.error(
                        {},
                        "user card not found",
                        404,
                        "error"
                    )
                );
            }

            return data
            .destroy()
            .then(() => res.status(200).json(
               ResFormat.build(
                 {},
                 "user card deleted successfully",
                 200,
                 "success"
               )
            ))
            .catch(error => res.status(500).json(
                ResFormat.error(
                    error,
                    "someting went wrong when delete the user card",
                    500,
                    "error"
                )
            ));
        });
    }
}