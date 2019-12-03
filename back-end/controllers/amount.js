const amount = require('../db/models').Amount;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {

    list(req, res) {
        console.log('bateuuuuuuuuuu')
        return amount
        .all()
        .then(amount => {
            if(!amount){ 
                res.status(204).json(ResponseFormat.build(
                amount,
                "no data",
                204,
                "false"
            ))}
                res.status(200).json(ResponseFormat.build(
                amount,
                "User amount Information Reterive successfully",
                200,
                "success"
            ))
        })
        
        .catch(error => res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong when Reterieve Information",
            400,
            "error"
        )));
    },
    listOne(req, res) {
        return amount
        .findById(req.params.userId)
        .then((amount) => res.status(200).json(
            ResponseFormat.build(
                amount,
                "all amount information are reterive successfully",
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
        return amount
        .findById(req.params.userId)
        .then(amount => {
            if(!amount) {
                return res.status(404).json(
                    ResponseFormat.error(
                        {},
                        "Amount not founded",
                        404,
                        "error"
                    )
                );
            }
            return amount
            .update({
                amount_available: req.body.amount || usr.amount,
            })
            .then(() => res.status(200).json(
                ResponseFormat.build(
                    amount,
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

}