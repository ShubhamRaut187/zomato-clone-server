const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../../../DataSchema/Users');

const userAuthSignupRouter = Router();

userAuthSignupRouter.post('/api/v1/user/signup', async (req, res)=>{
   
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(204).json({
            error: true,
            message: 'Request has no body.'
        });
        return;
   }

   const { name, email, password, mobilePrimary, mobileSecondary, address, paymentOption } = req.body;

   const securedPassword = bcrypt.hashSync(password,8);
   const newUser = new userModel({
        name,
        email,
        password: securedPassword,
        mobilePrimary,
        mobileSecondary,
        address,
        paymentOption,
    });

   try {

        await newUser.save();
        res.status(201).json({
            error: false,
            message: 'User created successfully.'
        });

   } catch (error) {

        res.status(501).json({
            error: true,
            message: 'Internal server error.',
            cause: error,
        });

   }

});

userAuthSignupRouter.post('/api/v1/user/login', async(req,res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(204).json({
            error: true,
            message: 'Request has no body.'
        });
        return;
    }

    try {
        
        const { email, password } = req.body;
        const registeredUser = userModel.findOne(email);
        if (!registeredUser) {
            res.status(404).json({
                error: false,
                message: 'User not found.'
            });
            return;
        }

        // Compare hashed password with the input password
        const securedPassword = registeredUser.password;
        const isPasswordValid = bcrypt.compareSync(password, securedPassword);

        if (isPasswordValid) {

            // Todo: Create a secure user token in .env and configure for further use.
            // Todo: Implement cookie based authentication
            // Assign a security token to verify authenticated user.
            const securityToken = jwt.sign({ userId: registeredUser._id }, 'user-token');
           
            res.status(200).json({
                error: false,
                message: 'User authenticated',
                status: 'authenticated',
                token: `SESSION=${securityToken}`,
            });

        } else {

            res.status(400).json({
                error: false,
                message: 'Invalid password',
            });

        }

    } catch (error) {
        
        res.status(501).json({
            error: true,
            message: 'Internal server error.',
            cause: error,
        });

    }
})

// Note: Routes not tested yet.

module.exports = {
    userAuthSignupRouter,
}