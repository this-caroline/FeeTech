const card = require('../db/models').Card;
const comment = require('../db/models').Comment;
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
        return user
        .all()
        .then(users => res.status(200).json(ResponseFormat.build(
            users,
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
    listWithComment(req, res) {
        return user
        .findAll({
            include: [{
                model: comment,
                as: 'comments'
            }],
            order:[
             ['createdAt', 'DESC'],
             [{model: comment, as:'comments'}, 'createdAt', 'ASC'],
            ],
        })
        .then((users) => res.status(200).json(
            ResponseFormat.build(
                users,
                "all user information are reterive successfully",
                200,
                "success"
            )
        ))
        .catch((error) => res.status(500).json(
            ResponseFormat.error(
                error,
                "somthing went wrong when reterieve the data",
                500,
                "error"
            )
        ))
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
                name: req.body.name || usr.firstName,
                email: req.body.email || usr.lastName,
                password:  req.body.password || usr.email
            })
            .then(() => res.status(200).json(
                ResponseFormat.build(
                    usr,
                    "user Update successfully",
                    200,
                    "success"
                )
            ))
            .catch((error) => res.status(500).json(
                ResponseFormat.build(
                    {},
                    "someting went wrong when update the user",
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
                        "user not found",
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
                 "user deleted successfully",
                 200,
                 "success"
               )
            ))
            .catch(error => res.status(500).json(
                ResponseFormat.error(
                    error,
                    "someting went wrong when delete the user",
                    500,
                    "error"
                )
            ));
        });
    }
}