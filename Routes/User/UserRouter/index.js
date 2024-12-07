const { Router } = require('express');
const bcrypt = require('bcrypt');

const userRouter = Router();

userRouter.post('/api/v1/signup', async (req, res)=>{
   
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