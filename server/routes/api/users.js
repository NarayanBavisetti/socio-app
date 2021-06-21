const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');

// router.post(
//     '/',
//     body('name' , "Name is required").not().isEmpty(),
//     // email must be an email
//     body('email').isEmail(),
//     // password must be at least 5 chars long
//     body('password').isLength({ min: 5 }),
//     (req, res) => {
//       // Finds the validation errors in this request and wraps them in an object with handy functions
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       res.send("users route")
//     })  













router.post("/",
    body('name' , "Name is required").not().isEmpty(),
    body("email", "valid email is required").isEmail(),
    body("password", "password must be more than 5 charactersctic").isLength({min: 6})
 , ((req,res) => {
const error = validationResult(req)
    console.log(req.body)
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    res.send("users route")
}))

module.exports  = router;