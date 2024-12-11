const { adminModel }  = require('../../../DataSchema/Admin');

// Middleware to check the user request authorization.
const isUserAuthorized = async(req,res) => {
    const userId = req.userId;
    if (!userId || typeof userId !== 'string') {
        
        console.log('Authorization Middleware: ', 'userId not found.')
        res.status(401).json({
            error: false,
            message: 'User is not authenticated. Authentication failed while checking Authorization.'
        });

        return;

    }

   try {

        const userIdFromParams = req.body.userId;
        const admin = await adminModel.findOne({ _id: userId });

        if (userId === userIdFromParams) {
            next();
        }

        if ((admin && admin.category === 'super-admin-system') || (admin && admin.category === 'general-admin-system')) {
            next();
        }

        res.status(401).json({
            error: false,
            message: 'User is not authorized to perform the request.'
        });

   } catch (error) {
    
        console.log('Error at authorization middleware: ', error);
        res.status(501).json({
            error: true,
            message: 'Internal server error at authorization.',
            cause: error,
        });
   }    
};


const isPlatformAdmin = async(req, res) => {
    const adminId = req.userId;
    if (!adminId || typeof adminId !== 'string') {
        
        console.log('Authorization Middleware for admin: ', 'adminId not found.')
        res.status(401).json({
            error: false,
            message: 'Admin is not authenticated. Authentication failed while checking Authorization.'
        });

        return;
    }

    try {
        const admin = await adminModel.findOne({ _id: adminId });

        if ((admin && admin.category === 'super-admin-system') || (admin && admin.category === 'general-admin-system')) {
            next();
        }
        
        res.status(401).json({
            error: false,
            message: 'Admin not authorized to block user.'
        });

    } catch (error) {

        console.log('Error at authorization middleware: ', error);
        res.status(501).json({
            error: true,
            message: 'Internal server error at authorization.',
            cause: error,
        });

    }
}

module.exports = {
    isUserAuthorized,
    isPlatformAdmin,
}