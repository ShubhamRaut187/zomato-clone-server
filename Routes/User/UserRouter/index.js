const { Router } = require('express');
const bcrypt = require('bcrypt');

const userRouter = Router();

userRouter.post('/api/v1/signup', async (req, res)=>{
   
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(204).json({
            error: false,
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

userRouter.get('/api/v1/users',async(req,res) => {
    // Todo: Add filtering options in API using query params.
    try {
        
        let users = await userModel.find({});
        users = users.map((user) => {
            return delete user.password;
        })
        res.status(200).json({
            error: false,
            message: 'Users fetched sucessfully',
            users,
        });

    } catch (error) {
        
        res.status(501).json({
            error: true,
            message: 'Internal server error.',
            cause: error,
        });

    }
});

userRouter.get('api/v1/users/:userId', async(req,res) => {
    try {

        const userId = req.params.userId;
        // Validation to check for userId in the path params in request.
        if (!userId || typeof userId !== 'string') {
            res.status(204).json({
                error: false,
                message:'Request does notinclude userId.',
            });
            return;
        }

        const user = await userModel.findOne({ _id: userId });
        // Vaidation to check if the user is found in DB.
        if (!user || Object.keys(req.body).length === 0) {
            res.status(404).json({
                error: false,
                message: 'No user found.',
            });
            return;
        }

        res.status(200).json({
            error: false,
            message: 'Users fetched sucessfully.',
            user,
        })

    } catch (error) {
        
        res.status(501).json({
            error: true,
            message: 'Internal server error.',
            cause: error,
        });

    }
})