const handlers = require('./handler');
const validators = require('../validator/validator');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: handlers.register,
        options: {
            validate: {
                payload: validators.registerPayload,
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: handlers.login,
        options: {
            validate: {
                payload: validators.loginPayload,
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        }
    }
];