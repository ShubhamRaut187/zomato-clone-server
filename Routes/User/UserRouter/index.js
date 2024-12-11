const { Router } = require('express');
const bcrypt = require('bcrypt');

const { isUserAuthenticated } = require('../../../Middlewares/Authentication/User')
const { userModel } = require('../../../DataSchema/Users');

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

//Todo: Only super-admin-system and general-admin-system can view all users and they should be authenticated.
userRouter.get('/api/v1/users', isUserAuthenticated, async(req,res) => {
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

//Todo: This route should only be accessible by authorized user. The user cannot view another user's details. (Use middleware)
userRouter.get('api/v1/users/:userId', isUserAuthenticated, async(req,res) => {
    try {

        const userId = req.params.userId;
        // Validation to check for userId in the path params in request.
        if (!userId || typeof userId !== 'string') {
            res.status(204).json({
                error: false,
                message:'Request does not include userId.',
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
});

// Todo: Add logic or middleware which will prevent a user to modify details of another user. This route should only be accessible to authorized user.
userRouter.patch('/api/v1/user/update/:userId', isUserAuthenticated, async(req,res) => {
    try {

        const newUserDetails = req.body;
        const userId = req.params.userId;
        if (!newUserDetails || Object.keys(newUserDetails).length === 0) {
            res.status(204).json({
                error: false,
                message: 'Request has no data to update user.',
            });
            return;
        } 

        if (newUserDetails.password && typeof newUserDetails.password === 'string') {
            const unsecuredPassword = newUserDetails;
            const securedPassword = bcrypt.hash(unsecuredPassword, 8);
            const newDetails = {
                ...newUserDetails,
                password: securedPassword,
            }
            const updatedUser = await userModel.findOneAndUpdate({ _id: userId}, newDetails, { new: true });
            res.status(202).json({
                error: false,
                message: 'User updated successfully.',
                user: updatedUser,
            });
            return;
        } else {
            const updatedUser = await userModel.findOneAndUpdate({ _id: userId}, newUserDetails, { new: true });
            res.status(202).json({   
                error: false,
                message: 'User updated successfully.',
                user: updatedUser,
            });
        }

    } catch (error) {

        res.status(501).json({
            error: true,
            message: 'Internal server error.',
            cause: error,
        });

    }
});

// Todo: Prevent a user to delete any another user. Logout user when he/she deletes his account himself. Admin can also delete user.
// Todo: Add a Route to pause and resume the user account. 
userRouter.delete('/api/v1/delete/:userId', isUserAuthenticated, async(req,res) => {
    try {

        const userId = req.params.userId;
        if (!userId || typeof userId !== 'string') {
            res.status(204).json({
                error: false,
                message: 'Request does not have userId',
            });
            return;
        }

        const deletedUser = userModel.findOneAndDelete({ _id: userId}, { new: true });
        res.status(200).json({
            error: false,
            message: 'User deleted successfully.',
            user: deletedUser,
        });

    } catch (error) {
        
        res.status(501).json({
            error: true,
            message: 'Internal server error.',
            cause: error,
        });

    }
});

module.exports = {
    userRouter,
}