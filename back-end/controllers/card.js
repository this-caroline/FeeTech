const card = require('../db/models').Card;
const user = require('../db/models').User;
const ResFormat = require('../core').ResponseFormat;
var createError = require('http-errors');

module.exports = {
    async create(req, res) {
        await user.findById(req.params.userId)
        .then(data =>{ 
            if(!data){
            res.status(400).json(
                ResFormat.valError("User doesn't exists", 404)
        )}});

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
        return user
        .findById(req.params.userId)
        .then(usr => {
            if(!usr) {
                return res.status(404).json(
                    ResFormat.error(
                        {},
                        "User not found",
                        404,
                        "error"
                    )
                );
            }

            return usr
            .update({
                amount: req.body.password || usr.amount ,
                card_name: req.body.name || usr.card_name ,
                removed: req.body.email || usr.removed ,
            })
            .then(() => res.status(200).json(
                ResFormat.build(
                    usr,
                    "user card Update successfully",
                    200,
                    "success"
                )
            ))
            .catch((error) => res.status(500).json(
                ResFormat.build(
                    {},
                    "someting went wrong when update the user card",
                    500,
                    "error"
                )
            ));
        });
    },
    destroy (req, res) {
        return user
        .findById(req.params.userId)
        .then(usr => {
            if(!usr) {
                return res.status(404).json(
                    ResFormat.error(
                        {},
                        "user card not found",
                        404,
                        "error"
                    )
                );
            }

            return usr
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