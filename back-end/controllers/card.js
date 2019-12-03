const card = require('../db/models').Card;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return card
        .create({
            amount: req.body.password,
            card_name: req.body.name,
            user_id: req.body.cpf,
            removed: req.body.email,
        })
        .then(card => res.status(201).json(ResponseFormat.build(
            card,
            "Card Create Successfully",
            201,
            "success"
        )))
        .catch(error => res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Card",
            "error"
        )))
    },
    list(req, res) {
        return card
        .all()
        .then(card => res.status(200).json(ResponseFormat.build(
            card,
            "User Information Reterive successfully",
            200,
            "success"
        )))
        .catch(error => res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong when Reterieve Information",
            400,
            "error"
        )));
    },
  
    update(req, res) {
        return user
        .findById(req.params.userId)
        .then(usr => {
            if(!usr) {
                return res.status(404).json(
                    ResponseFormat.error(
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
                ResponseFormat.build(
                    usr,
                    "user card Update successfully",
                    200,
                    "success"
                )
            ))
            .catch((error) => res.status(500).json(
                ResponseFormat.build(
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
                    ResponseFormat.error(
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
               ResponseFormat.build(
                 {},
                 "user card deleted successfully",
                 200,
                 "success"
               )
            ))
            .catch(error => res.status(500).json(
                ResponseFormat.error(
                    error,
                    "someting went wrong when delete the user card",
                    500,
                    "error"
                )
            ));
        });
    }
}