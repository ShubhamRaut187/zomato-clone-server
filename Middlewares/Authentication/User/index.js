const jwt = require('jsonwebtoken');

const isUserAuthenticated = (req,res, next) => {
    const token = req.headers.Cookie.split("=")[1]
    if (!token || typeof token !== 'string') {
        res.status(401).json({
            error: false,
            message: 'User is not authenticated.'
        });
        return;
    }

    jwt.verify(token, 'user-token', async(error, decoded) => {
        if (error) {

            res.status(501).json({
                error: true,
                message: 'Error while verifying token.',
                cause: error,
            });
            return;
            
        }
        if (decoded) {

            const { UserId } = decoded;
            req.userId = UserId;
            next();

        } else {

            res.status(401).json({
                error: false,
                message: 'Invalid token please login again'
            });

        }
    });
};

module.exports = {
    isUserAuthenticated,
}